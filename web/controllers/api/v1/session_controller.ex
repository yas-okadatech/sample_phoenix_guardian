defmodule SamplePhoenixReactApp.Api.V1.SessionController do
  use SamplePhoenixReactApp.Web, :controller

  plug Ueberauth

  require Logger

  alias SamplePhoenixReactApp.UserAuth
  alias SamplePhoenixReactApp.UserQuery

  plug Guardian.Plug.EnsureAuthenticated,
    %{ handler: SamplePhoenixReactApp.Api.V1.SessionController } when not action in [:create]
  #plug Guardian.Plug.EnsurePermissions, on_failure: { SessionController, :forbidden_api }, default: [:write_profile]

  @doc """
    sign in
  """
  def create(conn, params = %{}) do
    user = Repo.one(UserQuery.by_email(params["user"]["email"] || ""))

    if user do
      changeset = UserAuth.login_changeset(user, params["user"])
      if changeset.valid? do
        #conn
        #|> Guardian.Plug.sign_in(user, :token, perms: %{ default: Guardian.Permissions.max })
        #|> json %{token: Guardian.Plug.current_token(conn)}
        { :ok, jwt, full_claims } = Guardian.encode_and_sign(user, :token,
                            perms: %{ default: Guardian.Permissions.max, admin: [:read_userlist]})
        json conn, %{token: jwt}
      else
        conn
        |> put_status(:unauthorized)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: changeset)
      end
    else
        conn
        |> put_status(:unauthorized)
        |> render(SamplePhoenixReactApp.ChangesetView, "error.json", changeset: nil)
    end
  end

  @doc """
    sign out
  """
  def delete(conn, _params) do
    case Guardian.revoke!(Plug.Conn.get_req_header(conn, "authorization"), :token) do
      :ok -> text conn, "sign out"
      _ -> text conn, "failed"
    end

  end

  def unauthenticated(conn, _params) do
    the_conn = put_status(conn, 401)
    case Guardian.Plug.claims(conn) do
      { :error, :no_session } -> json(the_conn, %{ error: "Login required" })
      { :error, reason } -> json(the_conn, %{ error: reason })
      _ -> json(the_conn, %{ error: "Login required" })
    end
  end

  def forbidden_api(conn, _) do

    conn
    |> put_status(403)
    |> json(%{ error: :forbidden })
  end


  alias Ueberauth.Strategy.Helpers

  def request(conn, _params) do
    render(conn, "request.html", callback_url: Helpers.callback_url(conn))
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> configure_session(drop: true)
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    case UserFromAuth.find_or_create(auth) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Successfully authenticated.")
        |> put_session(:current_user, user)
        |> redirect(to: "/")
      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: "/")
    end
  end
end
#!/bin/bash

vagrant up
vagrant ssh-config --host sample >> ~/.ssh/config
chmod 600 ~/.ssh/config

echo "### updated .ssh/config ###"
cat ~/.ssh/config

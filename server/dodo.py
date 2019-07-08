#!/usr/bin/env python
""" dodo.py is the task definitions for use with the doit package.

Like a makefile, it defines tasks that can be executed with their dependencies.

Tasks can be added by specifying a function that begins with task_ - please see
the existing tasks for examples. You can also read the doit documentation here:
 - http://pydoit.org/tasks.html

Before running tasks, doit will _execute_ all the functions in this file (and its
imported functions) - meaning - if you define a funtion that has a side effect,
it *will* be called multiple times. Conversely, if you define a task that emits a
string as the action - the method will be executed but the action will not be taken.

You can think of everything here as an autouse fixture - be careful!

"""
import os
import subprocess
import sys
from re import findall
from typing import MutableMapping, Any, List, Optional

from doit import get_var

from common.util import get_local_dependency_paths
from doit import get_var

DoitReturn = MutableMapping[str, Any]

PYTHON_FOLDER = os.path.dirname(os.path.abspath(__file__))

# TESTING_IMAGE = "naughtytao/python-builder:0.1"

DOIT_CONFIG: MutableMapping[str, List[str]] = {"default_tasks": ["formatcheck", "lint"]}

PROJECT = "dataplay"


def make_config_path(filename: str) -> str:
    """ Utility for making a config file path """
    return os.path.join(PYTHON_FOLDER, "common", filename)


def task_lint() -> DoitReturn:
    """ Runs the flake8 linter """
    config = make_config_path(".flake8")
    linter = f"flake8 {PROJECT} tests --config={config}"
    return {"actions": [linter], "verbosity": 2}


def task_format() -> DoitReturn:
    """ Runs the black code formatter, changing files inplace """
    config = make_config_path("pyproject.toml")
    formatter = f"black --config {config} {PROJECT} tests *.py"
    return {"actions": [formatter], "verbosity": 2}


def task_formatcheck() -> DoitReturn:
    """ Runs the black code formatter, checking for invalid code """
    config = make_config_path("pyproject.toml")
    formatter = f"black --config {config} --check {PROJECT} tests *.py"
    return {"actions": [formatter], "verbosity": 2}


def task_pytest() -> DoitReturn:
    """ Runs pytest with coverage"""
    coverage_config = make_config_path(".coveragerc")
    tester = f"pytest -v --cov=./ --cov-config {coverage_config}"
    return {"actions": [tester], "verbosity": 2}


def task_update_dependencies() -> DoitReturn:
    """ Updates the requirements-{mac,linux}.txt files for packages"""
    commands = []

    pinner_template = "pip-compile requirements.in --no-index --output-file {} "
    pinner = pinner_template.format("requirements.txt")
    '''
    linux_pinner = pinner_template.format("requirements-linux.txt")

    linux_command = f"'cd /python && pip install pip-tools && {linux_pinner}'"
    docker_command = (
        f"docker run -it --rm -v $PWD:/python {TESTING_IMAGE} bash -c {linux_command}"
    )
    '''
    commands.append(pinner)
    # commands.append(docker_command)

    return {"actions": commands, "verbosity": 2}


def task_install_dep():
    """ install server dependencies """
    return {
        "actions": [
            "curl https://raw.githubusercontent.com/automl/auto-sklearn/master/requirements.txt | xargs -n 1 -L 1 pip3 install",
            "pip3 install -r requirements.txt . --no-deps",
            "pip3 install numpy==1.16.0 holidays==0.9.8",
        ],
        "verbosity": 2,
    }


def task_tox() -> DoitReturn:
    """ Runs tox """
    return {"actions": ["tox"], "verbosity": 2}


def task_build() -> DoitReturn:
    """ Runs python setup.py sdist on packages """
    return {"actions": ["python setup.py sdist"], "verbosity": 2}


def task_link_client() -> DoitReturn:
    """ Create a symbol link of static to the client side build outout """
    return {"actions": ["ln -s ../client/dist static"], "verbosity": 2}


def task_server() -> DoitReturn:
    """ Runs dataplay server """
    return {
        "actions": [
            "gunicorn dataplay.server:app —bind=0.0.0.0:8000 --worker-class=sanic.worker.GunicornWorker --workers=5"
        ],
        "verbosity": 2,
    }

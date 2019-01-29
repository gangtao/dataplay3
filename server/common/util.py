#!/usr/bin/env python
""" Utility file for dodo.py & other scripts. """

import os
import logging


def get_logger(name: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    file_handler = logging.FileHandler("dodo.log", mode="w")
    logging_format = logging.Formatter("%(levelname)s %(asctime)s [%(name)s] %(message)s")
    file_handler.setFormatter(logging_format)
    file_handler.setLevel(logging.DEBUG)
    logger.addHandler(file_handler)
    return logger


def get_local_dependency_paths(platform: str, package: str, paths: str = "") -> str:
    """ Recursively check requirements-local.txt files to fetch all pinned
    requirements-{platfrom}.txt files as a string for use with pip-compile

    Args:
        platform (str): the sys.platform value
        package (str): the package name e.g. pyml.core
        paths (str): the string value of all the space separated file paths
            relative to the original package
    """
    logger = get_logger(__name__)
    logger.info(f"[{platform} {package}] Checking local requirements")
    path = os.path.join(package, "requirements-local.txt")

    # End if there are no more local requirements
    if not os.path.exists(path):
        separated = "\n\t".join(paths.split())
        if len(paths) > 0:
            logger.info(f"  Finished! Local dependency files:\n\t{separated}")
        else:
            logger.info("  Finished! No dependencies.")
        logger.info("=" * 70)
        return paths

    # Split them up by newline
    with open(path, "r") as local_requirements:
        reqs = local_requirements.read().splitlines()
        # We only need packages, not other requirement files

        def is_valid(r: str):
            return not (r.startswith("-r") or r.startswith("#"))

        reqs = [r for r in reqs if is_valid(r)]

    if len(reqs) > 0:
        logger.info(f" Found {len(reqs)} requirement(s)")
        # Make them a string
        filename = f"requirements-{platform}.txt"

        # Check new paths
        new_paths = []
        for req in reqs:
            new_path = os.path.join(req, filename)
            # Because we are running this script from the python directory
            # but passing the relative paths to pip-compile, we need to remove
            # the ../ from the path to check if it exists
            if os.path.exists(new_path[3:]):
                new_paths.append(new_path)
        new_string = " ".join(new_paths)

        # Add a space between existing and new paths
        paths += f" {new_string}"

        while reqs:
            # Get package name from relative path
            req = os.path.split(reqs.pop())[1]
            # Recurse through dependencies
            return get_local_dependency_paths(platform, package=req, paths=paths)

    return paths

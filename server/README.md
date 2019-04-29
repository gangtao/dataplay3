# Development

In case your current python is not version3 or you want to run in a separated env, using [virtualenv](https://virtualenv.pypa.io/en/latest/) is an option.
```bash
pip install --upgrade virtualenv
virtualenv -p python3 ENVNAME
source /path/to/ENVNAME/bin/activate
```

or if you are using python3, you can use the `venv` module:

```bash
python -m venv .venv
source .venv/bin/activate
```

After that, you'll want to install the `dev-requirements.txt`
```bash
pip install -r dev-requirements.txt
```
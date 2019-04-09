def df_to_cols_rows(df):
    for col in df:
        dt = df[col].dtype
        if dt == int or dt == float:
            df[col].fillna(0, inplace=True)
        else:
            df[col].fillna('', inplace=True)

    cols = list(df.columns.values)
    rows = df.get_values().tolist()
    return (cols, rows)

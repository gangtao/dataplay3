def df_to_cols_rows(df):
    cols = list(df.columns.values)
    rows = df.get_values().tolist()
    return (cols, rows)

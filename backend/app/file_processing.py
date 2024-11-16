from unstructured.partition.auto import partition
from unstructured.partition.common import convert_to_dataframe
import pandas as pd
from typing import List, Dict, Any
import os

def process_file(file_path: str) -> pd.DataFrame:
    """
    Process the uploaded file using Unstructured.io and convert it to a pandas DataFrame.
    """
    # Get the file extension
    _, file_extension = os.path.splitext(file_path)
    file_extension = file_extension.lower()

    # Partition the document
    elements = partition(filename=file_path)

    # Convert to DataFrame
    df = convert_to_dataframe(elements)

    # Perform additional processing based on file type
    if file_extension in ['.csv', '.xlsx', '.xls']:
        df = process_tabular_data(file_path)
    elif file_extension in ['.pdf', '.docx', '.doc', '.txt']:
        df = process_text_data(df)
    else:
        raise ValueError(f"Unsupported file type: {file_extension}")

    return df

def process_tabular_data(file_path: str) -> pd.DataFrame:
    """
    Process tabular data (CSV, Excel) directly using pandas.
    """
    _, file_extension = os.path.splitext(file_path)
    if file_extension.lower() == '.csv':
        return pd.read_csv(file_path)
    elif file_extension.lower() in ['.xlsx', '.xls']:
        return pd.read_excel(file_path)

def process_text_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Process text data extracted by Unstructured.io.
    Attempt to identify and structure relevant information.
    """
    # This is a simplified example. You may need to implement more sophisticated
    # logic based on the specific structure of your documents.
    
    # Assume we're looking for lines containing "glucose" or "insulin"
    glucose_data = df[df['text'].str.contains('glucose', case=False, na=False)]
    insulin_data = df[df['text'].str.contains('insulin', case=False, na=False)]
    
    # Combine and structure the data
    structured_data = pd.concat([glucose_data, insulin_data])
    structured_data['timestamp'] = pd.to_datetime(structured_data['text'].str.extract(r'(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})')[0])
    structured_data['value'] = structured_data['text'].str.extract(r'(\d+\.?\d*)')[0].astype(float)
    structured_data['type'] = structured_data['text'].apply(lambda x: 'glucose' if 'glucose' in x.lower() else 'insulin')
    
    return structured_data[['timestamp', 'type', 'value']]

def extract_data_from_df(df: pd.DataFrame) -> List[Dict[str, Any]]:
    """
    Extract relevant data from the DataFrame and convert it to a list of dictionaries.
    """
    return df.to_dict('records')

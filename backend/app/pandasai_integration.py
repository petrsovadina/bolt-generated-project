import os
from pandasai import SmartDataframe
from pandasai.llm import OpenAI
import pandas as pd

class PandasAIManager:
    def __init__(self):
        self.llm = OpenAI(api_token=os.getenv("OPENAI_API_KEY"))
        
    def create_smart_dataframe(self, df: pd.DataFrame) -> SmartDataframe:
        return SmartDataframe(df, config={
            "llm": self.llm,
            "enable_cache": True,
            "custom_whitelisted_dependencies": ["numpy", "pandas"],
            "verbose": True
        })
    
    def process_query(self, df: pd.DataFrame, query: str) -> str:
        smart_df = self.create_smart_dataframe(df)
        result = smart_df.chat(query)
        return str(result)

pandasai_manager = PandasAIManager()

def process_natural_language_query(df: pd.DataFrame, query: str) -> str:
    return pandasai_manager.process_query(df, query)

from loguru import logger
import sys

# Konfigurace logování
logger.remove()  # Odstraní výchozí handler
logger.add(sys.stderr, format="{time} {level} {message}", level="INFO")
logger.add("logs/app.log", rotation="500 MB", level="INFO")

# Exportujeme logger pro použití v jiných modulech
log = logger

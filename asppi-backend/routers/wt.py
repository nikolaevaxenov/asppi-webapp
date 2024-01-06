# Импортируем APIRouter из библиотеки FastAPI и функцию interpret_data из модуля utils
from fastapi import APIRouter
from utils import interpret_data

# Создаем экземпляр APIRouter с указанием префикса маршрута и тега
router = APIRouter(prefix="/data", tags=['polaris'])

# Определяем обработчик для HTTP GET запроса по маршруту "/data/wt"
@router.get("/wt")
def get_WT():
    # Используем функцию interpret_WT из модуля interpret_data для обработки данных
    return interpret_data.interpret_WT()

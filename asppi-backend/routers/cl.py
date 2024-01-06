# Импортируем APIRouter из библиотеки FastAPI и функцию interpret_data из модуля utils
from fastapi import APIRouter
from utils import interpret_data


# Создаем экземпляр APIRouter с указанием префикса маршрута и тега
router = APIRouter(prefix="/data", tags=['polaris'])

# Определяем обработчик для HTTP GET запроса по маршруту "/data/cl"
@router.get("/cl")
def get_CL():
    # Используем функцию interpret_CL из модуля interpret_data для обработки данных
    return interpret_data.interpret_CL()

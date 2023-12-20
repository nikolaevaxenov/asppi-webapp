from fastapi import APIRouter
from utils import interpret_data


router = APIRouter(prefix="/data", tags=['polaris'])


@router.get("/rc")
def get_RC():
    return interpret_data.interpret_RC()

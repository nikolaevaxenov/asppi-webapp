from fastapi import APIRouter
from utils import interpret_data


router = APIRouter(prefix="/data", tags=['polaris'])


@router.get("/da1")
def get_DA1():
    return interpret_data.interpret_DA1()

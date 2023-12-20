from fastapi import APIRouter
from utils import interpret_data


router = APIRouter(prefix="/data", tags=['polaris'])


@router.get("/cl")
def get_CL():
    return interpret_data.interpret_CL()

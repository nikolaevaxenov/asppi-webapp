from fastapi import APIRouter
from utils import interpret_data


router = APIRouter(prefix="/data", tags=['polaris'])


@router.get("/wt")
def get_WT():
    return interpret_data.interpret_WT()

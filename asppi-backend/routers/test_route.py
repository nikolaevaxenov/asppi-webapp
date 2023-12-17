from fastapi import APIRouter


router = APIRouter()


def getOutputFromFile(filename):
    with open(filename, encoding = 'cp866') as f:
        lines = f.readlines()
    return lines


@router.get("/testfile")
def get_mku():
    return getOutputFromFile('testfile')


@router.get("/")
def read_root():
    return {"Hello": "World"}
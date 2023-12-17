from fastapi import APIRouter


router = APIRouter(prefix="/polaris/onload", tags=['polaris'])


def getOutputFromFile(filename):
    with open('..\ASPPI\ASPPI_LC\Polaris\On_Load\o\\'+filename, encoding = 'cp866') as f:
        lines = f.readlines()
    return lines


@router.get("/nsfradcorr")
def get_mku():
    return getOutputFromFile('nsf_rad_corr')


@router.get("/polardgn")
def get_mku():
    return getOutputFromFile('polar.dgn')


@router.get("/polarout")
def get_mku():
    return getOutputFromFile('polar.out')


@router.get("/polarpwr")
def get_mku():
    return getOutputFromFile('polar.pwr')


@router.get("/polarscr")
def get_mku():
    return getOutputFromFile('polar.scr')

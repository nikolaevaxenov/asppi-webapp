from fastapi import APIRouter


router = APIRouter(prefix="/polaris/checkmku", tags=['polaris'])


def getOutputFromFile(filename):
    with open('..\ASPPI\ASPPI_LC\Polaris\CheckMKU\o\\'+filename, encoding = 'cp866') as f:
        lines = f.readlines()
    return lines
    

@router.get("/nsfradcorr")
def get_mku():
    return getOutputFromFile('nsf_rad_corr')


@router.get("/polardgn")
def get_mku():
    return getOutputFromFile('polar.dgn')


@router.get("/polarpwr")
def get_mku():
    return getOutputFromFile('polar.pwr')

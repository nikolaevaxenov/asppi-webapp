from fastapi import APIRouter


router = APIRouter(prefix="/troyka", tags=['troyka'])


def getOutputFromFile(filename):
    with open('..\ASPPI\ASPPI_LC\_Troyka\o\\'+filename, encoding = 'cp866') as f:
        lines = f.readlines()
    return lines


@router.get("/mku")
def get_mku():
    return getOutputFromFile('mku.txt')


@router.get("/mm")
def get_mku():
    return getOutputFromFile('mm.suz')


@router.get("/mp")
def get_mku():
    return getOutputFromFile('mp.suz')


@router.get("/ms")
def get_mku():
    return getOutputFromFile('ms.suz')


@router.get("/paspn")
def get_mku():
    return getOutputFromFile('paspn.out')


@router.get("/pm")
def get_mku():
    return getOutputFromFile('pm.suz')


@router.get("/porjdok")
def get_mku():
    return getOutputFromFile('porjdok.suz')


@router.get("/pp")
def get_mku():
    return getOutputFromFile('pp.suz')


@router.get("/sm")
def get_mku():
    return getOutputFromFile('sm.suz')


@router.get("/trk")
def get_mku():
    return getOutputFromFile('trk.out')


@router.get("/trprot")
def get_mku():
    return getOutputFromFile('trprot.out')


@router.get("/xenon")
def get_mku():
    return getOutputFromFile('xenon.txt')

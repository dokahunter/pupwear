
export default function pagerService(searchParams){

    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = Number(searchParams.get("itemsPerPage")) > 0 ? Number(searchParams.get("itemsPerPage")) : 9
    const endIdx = currentPage * itemsPerPage;
    const startIdx = endIdx - itemsPerPage;
    const pagerData = {startIdx, endIdx, itemsPerPage}

    return(
        pagerData
    );
}
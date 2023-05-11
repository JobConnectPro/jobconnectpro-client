import Link from "next/link"

const CompanyCard = ({company}) => {

    return (
        <>
            <div className="m-5">
                <p>{company.company_name}</p>
                <p>{company.address}</p>
                <p>{company.Sector.sector}</p>
                <Link href={`http://localhost:3000/seeker/companies/${company.id}`}>Detail</Link>
            </div>
        </>
    )
}

export default CompanyCard
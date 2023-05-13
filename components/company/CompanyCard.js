import Link from "next/link"
import Cookies from "js-cookie"

const CompanyCard = ({company, children}) => {
    const role = Cookies.get("role")

    return (
        <>
            <div className="m-5">
                <p>{company.company_name}</p>
                <p>{company.address}</p>
                <p>{company.Sector.sector}</p>
                {role == "Seeker" ? (
                    <Link href={`http://localhost:3000/seeker/companies/${company.id}`}>Detail</Link>
                ) : (
                    <Link href={`http://localhost:3000/employer/companies/${company.id}`}>Detail</Link>
                )}
                {children}
            </div>
        </>
    )
}

export default CompanyCard
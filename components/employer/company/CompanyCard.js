import Link from "next/link"
import Cookies from "js-cookie"

const CompanyCard = ({company, children}) => {
    const role = Cookies.get("role")

    return (
            <div className="m-5 flex bg-white p-5 rounded-lg shadow-md lg: w-2/4 sm:w-2/4">
                <div className="w-24 h-24 rounded-xl mr-4">
                    <img src={company.logo ? company.logo : 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png'} className="w-24 h-24 rounded-xl shadow-sm"></img>
                </div>
                <div>
                    <p className="text-xl font-semibold">{company.company_name}</p>
                    <p className="text-gray-700">{company.address}</p>
                    <p className="text-gray-700">{company.Sector.sector}</p>
                    {role == "Seeker" ? (
                        <Link className="font-semibold text-blue-500 hover:text-blue-700" href={`http://localhost:3000/seeker/companies/${company.id}`}>Detail</Link>
                    ) : (
                        <Link className="font-semibold text-blue-500 hover:text-blue-700" href={`http://localhost:3000/employer/companies/${company.id}`}>Detail</Link>
                    )}
                </div>
                {children}
            </div>
    )
}

export default CompanyCard
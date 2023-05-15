import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';

const CompanyCard = ({ company, children }) => {
  const role = Cookies.get('role');

  return (
    <>
      <div className="bg-white rounded-lg border-slate-200 border p-6 flex items-center justify-between">
        <div className="flex items-center">
          {company.logo != null && <Image loader={() => company.logo} className="mr-4 object-cover object-center" src={company.logo} alt="Alternative text" width={60} height={60} />}
          {company.logo == null && <Image className="mr-4 object-cover object-center" src="/img/blank-pp.jpg" alt="Alternative text" width={60} height={60} />}
          <div className="">
            {role == 'Seeker' ? (
              <Link href={`/seeker/companies/${company.id}`}>
                <h2 className="text-xl font-bold hover:underline hover:text-blue-700">{company.company_name}</h2>
              </Link>
            ) : (
              <Link href={`/employer/companies/${company.id}`}>
                <h2 className="text-xl font-bold hover:underline hover:text-blue-700">{company.company_name}</h2>
              </Link>
            )}
            <p className="text-blue-500 mb-2">{company.Sector.sector}</p>
            <p className="text-gray-600">{company.address}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;

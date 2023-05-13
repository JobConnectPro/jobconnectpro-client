import { useRouter } from 'next/router';
import { getCompanyDetail } from '@/modules/fetchCompanies';
import CompanyDetail from '@/components/company/CompanyDetail'
import Layout from '@/components/layout/Dashboard';

const page = ( { res }) => {
    const router = useRouter()
    
    return (
        <Layout>
            <CompanyDetail res={res} ></CompanyDetail>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    const res = await getCompanyDetail(id, context)

    return {
        props: {
            res
        }
    }
}

export default page
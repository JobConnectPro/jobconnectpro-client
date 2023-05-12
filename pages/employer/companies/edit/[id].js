import { useRouter } from 'next/router';
import { getCompanyDetail } from '@/modules/fetchCompanies';
import CompanyUpdate from '@/components/company/CompanyUpdate'
import Layout from '@/components/layout/Dashboard';

const page = ( { res }) => {
    const router = useRouter()
    
    return (
        <Layout>
            <CompanyUpdate res={res} ></CompanyUpdate>
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
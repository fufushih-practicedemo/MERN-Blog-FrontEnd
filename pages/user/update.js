import Layout from '../../components/layout';
import Private from '../../components/auth/private.component';
import ProfileUpdate from '../../components/auth/profileUpdate.component';
import Link from 'next/link';

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserProfileUpdate;
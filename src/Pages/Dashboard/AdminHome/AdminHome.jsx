import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { authContext } from '../../../Provider/AuthProvider';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle, FaEnvelope } from 'react-icons/fa';


const AdminHome = () => {
    const { user } = useContext(authContext)
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chartData'],
        queryFn: async () => {
            const res = await axiosSecure('/order-status');
            return res.data;
        }
    })

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <div className='text-center'>
            <h2 className='text-center py-4 text-2xl'>Hi, {user?.displayName}</h2>
            <div className="stats shadow gap-2 w-full">

                <div className="stat place-items-center bg-gradient-to-r from-cyan-500 to-cyan-200">
                    <div className="stat-value">${stats.revenue}</div>
                    <div className="stat-title">Revenue</div>
                    {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                </div>

                <div className="stat place-items-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <div className="stat-value text-secondary">{stats.users}</div>
                    <div className="stat-title">Customers</div>
                    {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
                </div>

                <div className="stat place-items-center bg-gradient-to-r from-cyan-500 to-cyan-200">
                    <div className="stat-value">{stats.products}</div>
                    <div className="stat-title">Products</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

                <div className="stat place-items-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-title">Orders</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

            </div>

            {/* rechart is start from here............... */}
            <div className='mt-6'>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='category' />
                    <YAxis />
                    <Bar dataKey='revenue' fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default AdminHome;
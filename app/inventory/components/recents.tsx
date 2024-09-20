import { DashboardProps } from '@/lib/@types/dashboard';
import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import LogItem from '../logs/components/log-item';
import Log from '@/lib/@types/log';

const Recents: FC<Partial<DashboardProps>> = ({ before, after }) => {
    const [recents, setRecents] = useState<Log[]>([]);

    const fetchData = async (before?: string, after?: string): Promise<Log[]> => {
        try {
            let query = '?l=10';
            if (before) query += `&b=${encodeURIComponent(before)}`;
            if (after) query += `&a=${encodeURIComponent(after)}`;
            if (!(before || after)) query = '';
            const response = await axios.get(`/api/logs${query}`);
            if (response.status !== 200) {
                throw response;
            }
            console.log('Values', response.data);
            return response.data.logs || [];
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    useEffect(() => {
        fetchData(before, after).then((data) => {
            setRecents(data);
        });
    }, [before, after]);

    return (
        <div className="w-full h-[350px] grow rounded-md bg-white shadow-md overflow-y-auto flex flex-col gap-3 scrollbar-thin">
            <h3 className="w-full sticky top-0 bg-white text-lg text-pri-6 font-semibold font-quicksand pt-4 px-4">
                Recent Actions
            </h3>
            <ul className="px-4 flex flex-col gap-2 mb-4">
                {recents && recents.length > 0 ? (
                    recents.map((val: Log, idx) => (
                        <LogItem key={idx} {...val} preview={false} />
                    ))
                ) : (
                    <div>Nothing to see here</div>
                )}
            </ul>
        </div>
    );
};

export default Recents;
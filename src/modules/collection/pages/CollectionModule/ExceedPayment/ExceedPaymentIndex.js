import React, { useState } from 'react';
import { Tabs } from 'antd';
import ExceedPaymentTableIndex from './ExceedPaymentTableIndex';

const tabConfigurations = [
    {
        key: '1',
        label: 'Miscellaneous',
        type: 'miscellaneous'
    },
    {
        key: '2',
        label: 'Retain 6 Months',
        type: 'due_retain_period'
    },
    {
        key: '3',
        label: 'After 6 Months',
        type: 'after_retain_period'
    },
    {
        key: '4',
        label: 'Refund',
        type: 'refund'
    },
];

const ExceedPayment = () => {
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = (key) => {
        console.log('Tab changed to:', key);
        setActiveTab(key);
    };

    const items = tabConfigurations.map(tab => ({
        key: tab.key,
        label: tab.label,
        children: (
            <ExceedPaymentTableIndex 
                type={tab.type}
                activeTab={activeTab}
                isActive={activeTab === tab.key}
            />
        )
    }));

    return (
        <Tabs 
            activeKey={activeTab}
            items={items} 
            onChange={handleTabChange}
        />
    );
};

export default ExceedPayment;
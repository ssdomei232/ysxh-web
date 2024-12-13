'use client'

import { useState, useEffect } from 'react';
import DeviceList from './DeviceList';
import DeviceForm from './DeviceForm';
import DistributionRecord from './DistributionRecord';
import { saveToLocalStorage, getFromLocalStorage, exportData } from '../utils/localStorage';
import Alert from './Alert';

export interface Device {
  id: string;
  name: string;
  quantity: number;
  serialNumber: string;
}

export interface Distribution {
  id: string;
  deviceId: string;
  recipient: string;
  startDate: string;
  endDate: string;
  quantity: number;
}

export default function Device() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    const savedDevices = getFromLocalStorage('devices');
    const savedDistributions = getFromLocalStorage('distributions');
    if (savedDevices) setDevices(savedDevices);
    if (savedDistributions) setDistributions(savedDistributions);
  }, []);

  useEffect(() => {
    saveToLocalStorage('devices', devices);
  }, [devices]);

  useEffect(() => {
    saveToLocalStorage('distributions', distributions);
  }, [distributions]);

  const handleAddDevice = (device: Device) => {
    setDevices([...devices, device]);
  };

  const handleUpdateDevice = (updatedDevice: Device) => {
    setDevices(devices.map(d => d.id === updatedDevice.id ? updatedDevice : d));
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
    setDistributions(distributions.filter(d => d.deviceId !== id));
    showAlert('设备已成功删除', 'success');
  };

  const handleAddDistribution = (distribution: Distribution) => {
    const device = devices.find(d => d.id === distribution.deviceId);
    if (device && device.quantity >= distribution.quantity) {
      setDistributions([...distributions, distribution]);
      handleUpdateDevice({ ...device, quantity: device.quantity - distribution.quantity });
      showAlert('设备分发成功', 'success');
    } else {
      showAlert('设备数量不足,无法分发', 'error');
    }
  };

  const handleUpdateDistribution = (updatedDistribution: Distribution) => {
    const oldDistribution = distributions.find(d => d.id === updatedDistribution.id);
    if (oldDistribution) {
      const device = devices.find(d => d.id === updatedDistribution.deviceId);
      if (device) {
        const quantityDiff = oldDistribution.quantity - updatedDistribution.quantity;
        handleUpdateDevice({ ...device, quantity: device.quantity + quantityDiff });
      }
    }
    setDistributions(distributions.map(d => d.id === updatedDistribution.id ? updatedDistribution : d));
  };

  const handleDeleteDistribution = (id: string) => {
    const distribution = distributions.find(d => d.id === id);
    if (distribution) {
      const device = devices.find(d => d.id === distribution.deviceId);
      if (device) {
        handleUpdateDevice({ ...device, quantity: device.quantity + distribution.quantity });
      }
    }
    setDistributions(distributions.filter(d => d.id !== id));
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        if (importedData.devices) setDevices(importedData.devices);
        if (importedData.distributions) setDistributions(importedData.distributions);
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    exportData({ devices, distributions }, 'inventory_data.json');
  };

  const showAlert = (message: string, type: 'success' | 'error' | 'warning') => {
    setAlert({ message, type });
  };

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-lg p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">摄影社团库存管理系统</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <label className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
          导入数据
          <input type="file" onChange={handleImport} className="hidden" />
        </label>
        <button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
          导出数据
        </button>
      </div>
      <DeviceForm onAddDevice={handleAddDevice} />
      <DeviceList
        devices={devices}
        onUpdateDevice={handleUpdateDevice}
        onDeleteDevice={handleDeleteDevice}
        showAlert={showAlert} // 修复这里
      />
      <DistributionRecord
        devices={devices}
        distributions={distributions}
        onAddDistribution={handleAddDistribution}
        onUpdateDistribution={handleUpdateDistribution}
        onDeleteDistribution={handleDeleteDistribution}
        showAlert={showAlert} // 修复这里
      />
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
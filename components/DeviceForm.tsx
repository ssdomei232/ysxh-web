import { useState } from 'react';
import { Device } from './InventoryManagement';

interface DeviceFormProps {
  onAddDevice: (device: Device) => void;
}

export default function DeviceForm({ onAddDevice }: DeviceFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDevice: Device = {
      id: Date.now().toString(),
      name,
      quantity: parseInt(quantity),
      serialNumber,
    };
    onAddDevice(newDevice);
    setName('');
    setQuantity('');
    setSerialNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">添加新设备</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="设备名称"
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="数量"
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          value={serialNumber}
          onChange={e => setSerialNumber(e.target.value)}
          placeholder="序列号"
          required
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300">
          添加设备
        </button>
      </div>
    </form>
  );
}


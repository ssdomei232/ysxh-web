import { useState } from 'react';
import { Device } from './InventoryManagement';

interface DeviceListProps {
  devices: Device[];
  onUpdateDevice: (device: Device) => void;
  onDeleteDevice: (id: string) => void;
  showAlert: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export default function DeviceList({ devices, onUpdateDevice, onDeleteDevice, showAlert }: DeviceListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (device: Device) => {
    setEditingId(device.id);
  };

  const handleSave = (device: Device) => {
    onUpdateDevice(device);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个设备吗？')) {
      onDeleteDevice(id);
      showAlert('设备已成功删除', 'success');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">设备列表</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700">
              <th className="p-2 text-left rounded-tl-lg">名称</th>
              <th className="p-2 text-left">数量</th>
              <th className="p-2 text-left">序列号</th>
              <th className="p-2 text-left rounded-tr-lg">操作</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id} className="border-b border-indigo-100 hover:bg-indigo-50 transition duration-300">
                <td className="p-2">
                  {editingId === device.id ? (
                    <input
                      type="text"
                      value={device.name}
                      onChange={e => onUpdateDevice({ ...device, name: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    device.name
                  )}
                </td>
                <td className="p-2">
                  {editingId === device.id ? (
                    <input
                      type="number"
                      value={device.quantity}
                      onChange={e => onUpdateDevice({ ...device, quantity: parseInt(e.target.value) })}
                      className="border rounded p-1 w-20"
                    />
                  ) : (
                    device.quantity
                  )}
                </td>
                <td className="p-2">{device.serialNumber}</td>
                <td className="p-2">
                  {editingId === device.id ? (
                    <button onClick={() => handleSave(device)} className="bg-green-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-green-600 transition duration-300">
                      保存
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(device)} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600 transition duration-300">
                      编辑
                    </button>
                  )}
                  <button onClick={() => handleDelete(device.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


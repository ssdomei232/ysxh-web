import { useState } from 'react';
import { Device, Distribution } from './InventoryManagement';

interface DistributionRecordProps {
  devices: Device[];
  distributions: Distribution[];
  onAddDistribution: (distribution: Distribution) => void;
  onUpdateDistribution: (distribution: Distribution) => void;
  onDeleteDistribution: (id: string) => void;
  showAlert: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export default function DistributionRecord({
  devices,
  distributions,
  onAddDistribution,
  onUpdateDistribution,
  onDeleteDistribution,
  showAlert,
}: DistributionRecordProps) {
  const [deviceId, setDeviceId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDistribution: Distribution = {
      id: Date.now().toString(),
      deviceId,
      recipient,
      startDate,
      endDate,
      quantity: parseInt(quantity),
    };
    if (isDeviceAvailable(deviceId, parseInt(quantity))) {
      onAddDistribution(newDistribution);
      resetForm();
      showAlert('设备分发成功', 'success');
    } else {
      showAlert('设备数量不足,无法分发', 'error');
    }
  };

  const resetForm = () => {
    setDeviceId('');
    setRecipient('');
    setStartDate('');
    setEndDate('');
    setQuantity('');
  };

  const handleEdit = (distribution: Distribution) => {
    setEditingId(distribution.id);
    setDeviceId(distribution.deviceId);
    setRecipient(distribution.recipient);
    setStartDate(distribution.startDate);
    setEndDate(distribution.endDate);
    setQuantity(distribution.quantity.toString());
  };

  const handleSave = () => {
    if (editingId) {
      const updatedDistribution: Distribution = {
        id: editingId,
        deviceId,
        recipient,
        startDate,
        endDate,
        quantity: parseInt(quantity),
      };
      onUpdateDistribution(updatedDistribution);
      setEditingId(null);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条分发记录吗？')) {
      onDeleteDistribution(id);
      showAlert('分发记录已成功删除', 'success');
    }
  };

  const isDeviceAvailable = (deviceId: string, quantity: number) => {
    const device = devices.find(d => d.id === deviceId);
    return device ? device.quantity >= quantity : false;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">分发记录</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select
            value={deviceId}
            onChange={e => setDeviceId(e.target.value)}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">选择设备</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.name} (可用: {device.quantity})
              </option>
            ))}
          </select>
          <input
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder="领用人"
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
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
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300"
            disabled={!isDeviceAvailable(deviceId, parseInt(quantity))}
          >
            添加分发记录
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700">
              <th className="p-2 text-left rounded-tl-lg">设备</th>
              <th className="p-2 text-left">领用人</th>
              <th className="p-2 text-left">开始日期</th>
              <th className="p-2 text-left">结束日期</th>
              <th className="p-2 text-left">数量</th>
              <th className="p-2 text-left rounded-tr-lg">操作</th>
            </tr>
          </thead>
          <tbody>
            {distributions.map(distribution => (
              <tr key={distribution.id} className="border-b border-indigo-100 hover:bg-indigo-50 transition duration-300">
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <select
                      value={deviceId}
                      onChange={e => setDeviceId(e.target.value)}
                      className="border rounded p-1 w-full"
                    >
                      {devices.map(device => (
                        <option key={device.id} value={device.id}>
                          {device.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    devices.find(d => d.id === distribution.deviceId)?.name
                  )}
                </td>
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <input
                      type="text"
                      value={recipient}
                      onChange={e => setRecipient(e.target.value)}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    distribution.recipient
                  )}
                </td>
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    distribution.startDate
                  )}
                </td>
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    distribution.endDate
                  )}
                </td>
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      className="border rounded p-1 w-20"
                    />
                  ) : (
                    distribution.quantity
                  )}
                </td>
                <td className="p-2">
                  {editingId === distribution.id ? (
                    <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-green-600 transition duration-300">
                      保存
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(distribution)} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600 transition duration-300">
                      编辑
                    </button>
                  )}
                  <button onClick={() => handleDelete(distribution.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300">
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


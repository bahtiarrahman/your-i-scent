import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function BankSection({
  settings,
  bankForm,
  setBankForm,
  editingBankId,
  handleAddBank,
  handleUpdateBank,
  handleEditBank,
  handleDeleteBank,
  cancelEdit
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Kelola Rekening Bank</h2>
        <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus rekening bank</p>
      </div>

      {/* FORM */}
      <div className="p-6 bg-yellow-50/50">

        {/* 🔥 GRID FIX DI SINI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

          {/* Nama Bank */}
          <input
            type="text"
            placeholder="Nama Bank"
            value={bankForm.name}
            onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {/* Nomor Rekening */}
          <input
            type="text"
            placeholder="Nomor Rekening"
            value={bankForm.accountNumber}
            onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {/* Nama Pemilik */}
          <input
            type="text"
            placeholder="Nama Pemilik"
            value={bankForm.accountName}
            onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />

          {/* 🔥 BUTTON SEKARANG SEJAJAR */}
          {editingBankId ? (
            <div className="flex gap-2">
              <button
                onClick={handleUpdateBank}
                className="flex-1 h-[48px] flex items-center justify-center gap-2 bg-yellow-500 text-white rounded-xl"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 h-[48px] flex items-center justify-center gap-2 bg-gray-500 text-white rounded-xl"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddBank}
              className="h-[48px] flex items-center justify-center gap-2 bg-yellow-500 text-white rounded-xl w-full"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          )}

        </div>
      </div>

      {/* LIST */}
      <div className="divide-y">
        {settings.bank.map(bank => (
          <div key={bank.id} className="p-4 flex justify-between items-center">

            <div>
              <p className="font-semibold text-gray-800">{bank.name}</p>
              <p className="text-sm text-gray-500">
                {bank.accountNumber} - {bank.accountName}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditBank(bank)}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBank(bank.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
              >
                Hapus
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
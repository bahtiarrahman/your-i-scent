export default function EwalletSection({
  settings,
  ewalletForm,
  setEwalletForm,
  editingEwalletId,
  handleAddEwallet,
  handleUpdateEwallet,
  handleEditEwallet,
  handleDeleteEwallet,
  cancelEdit
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Kelola E-Wallet</h2>
        <p className="text-gray-500 text-sm mt-1">Tambah dan kelola e-wallet</p>
      </div>

      <div className="p-6 bg-yellow-50/50">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={ewalletForm.name}
            onChange={(e) => setEwalletForm({ ...ewalletForm, name: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          >
            <option value="">Pilih E-Wallet</option>
            <option>DANA</option>
            <option>OVO</option>
            <option>GoPay</option>
          </select>

          <input
            type="text"
            placeholder="Nomor"
            value={ewalletForm.number}
            onChange={(e) => setEwalletForm({ ...ewalletForm, number: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
          />
        </div>

        <div className="flex gap-2 mt-4">
          {editingEwalletId ? (
            <>
              <button onClick={handleUpdateEwallet} className="px-6 py-3 bg-yellow-500 text-white rounded-xl">
                Simpan
              </button>
              <button onClick={cancelEdit} className="px-6 py-3 bg-gray-500 text-white rounded-xl">
                Batal
              </button>
            </>
          ) : (
            <button onClick={handleAddEwallet} className="px-6 py-3 bg-yellow-500 text-white rounded-xl">
              Tambah
            </button>
          )}
        </div>

      </div>

      <div className="divide-y">
        {settings.ewallet.map(e => (
          <div key={e.id} className="p-4 flex justify-between">
            <span>{e.name} - {e.number}</span>

            <div className="flex gap-2">
              <button onClick={() => handleEditEwallet(e)} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg">
                Edit
              </button>
              <button onClick={() => handleDeleteEwallet(e.id)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
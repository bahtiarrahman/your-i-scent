export default function QrisSection({
  qrisPreview,
  handleQrisImageUpload,
  handleSaveQris,
  whatsappForm,
  setWhatsappForm,
  handleSaveWhatsApp
}) {
  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">WhatsApp Admin</h2>

        <input
          value={whatsappForm}
          onChange={(e) => setWhatsappForm(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 w-full mb-3"
        />

        <button onClick={handleSaveWhatsApp} className="px-6 py-3 bg-yellow-500 text-white rounded-xl">
          Simpan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">QRIS</h2>

        <input type="file" onChange={handleQrisImageUpload} />

        {qrisPreview && (
          <img src={qrisPreview} className="mx-auto mt-4 w-40 rounded-lg" />
        )}

        <button onClick={handleSaveQris} className="px-6 py-3 bg-yellow-500 text-white rounded-xl mt-4">
          Simpan QRIS
        </button>
      </div>

    </div>
  );
}
export default function ShippingSection({
  settings,
  cityForm,
  setCityForm,
  editingCityId,
  handleAddCity,
  handleUpdateCity,
  handleEditCity,
  handleDeleteCity,
  freeShippingForm,
  setFreeShippingForm,
  handleSaveFreeShipping
}) {
  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Gratis Ongkir</h2>

        <input
          type="number"
          value={freeShippingForm}
          onChange={(e) => setFreeShippingForm(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 w-full mb-3"
        />

        <button onClick={handleSaveFreeShipping} className="px-6 py-3 bg-yellow-500 text-white rounded-xl">
          Simpan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Kelola Kota</h2>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <input
            placeholder="Nama Kota"
            value={cityForm.name}
            onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200"
          />

          <input
            type="number"
            placeholder="Ongkir"
            value={cityForm.cost}
            onChange={(e) => setCityForm({ ...cityForm, cost: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200"
          />

          {editingCityId ? (
            <button onClick={handleUpdateCity} className="bg-yellow-500 text-white rounded-xl">
              Update
            </button>
          ) : (
            <button onClick={handleAddCity} className="bg-yellow-500 text-white rounded-xl">
              Tambah
            </button>
          )}
        </div>

        {settings.cities.map(city => (
          <div key={city.id} className="flex justify-between py-2 border-b">
            <span>{city.name} - Rp {city.cost}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEditCity(city)}>Edit</button>
              <button onClick={() => handleDeleteCity(city.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPaymentSettings,
  savePaymentSettings,
  isAdmin as checkIsAdmin
} from "../utils/storage";

import {
  confirmAction,
  showSuccess,
  showError
} from "../utils/alerts";

// SECTION
import BankSection from "./payment/BankSection";
import EwalletSection from "./payment/EwalletSection";
import ShippingSection from "./payment/ShippingSection";
import QrisSection from "./payment/QrisSection";

export default function PaymentSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bank");

  const [settings, setSettings] = useState({
    bank: [],
    ewallet: [],
    cities: [],
    qris: {},
    whatsappAdmin: ""
  });

  const [bankForm, setBankForm] = useState({
    name: "",
    accountNumber: "",
    accountName: ""
  });

  const [ewalletForm, setEwalletForm] = useState({
    name: "",
    number: ""
  });

  const [cityForm, setCityForm] = useState({
    name: "",
    cost: 0
  });

  const [editingId, setEditingId] = useState(null);

  const [freeShippingForm, setFreeShippingForm] = useState(0);

  const [qrisForm, setQrisForm] = useState({});
  const [qrisPreview, setQrisPreview] = useState("");

  const [whatsappForm, setWhatsappForm] = useState("");

  // ================= LOAD =================
  const load = () => {
    const data = getPaymentSettings();
    setSettings(data);
    setQrisPreview(data.qris?.image || "");
    setWhatsappForm(data.whatsappAdmin || "");
    setFreeShippingForm(data.freeShippingThreshold || 0);
  };

  useEffect(() => {
    if (!checkIsAdmin()) return navigate("/login");
    load();
  }, []);

  // ================= GENERIC SAVE =================
  const save = (key, value) => {
    const data = getPaymentSettings();
    data[key] = value;
    savePaymentSettings(data);
    load();
  };

  // ================= GENERIC DELETE =================
  const removeItem = async (key, id, name) => {
    const confirm = await confirmAction({
      title: "Hapus data?",
      text: name || "Data akan dihapus"
    });

    if (!confirm) return;

    save(key, settings[key].filter((i) => i.id !== id));
    showSuccess("Berhasil dihapus");
  };

  // ================= BANK =================
  const addBank = () => {
    if (!bankForm.name || !bankForm.accountNumber) {
      return showError("Lengkapi data!");
    }

    save("bank", [...settings.bank, { id: Date.now(), ...bankForm }]);

    setBankForm({ name: "", accountNumber: "", accountName: "" });
    showSuccess("Bank ditambahkan");
  };

  const updateBank = () => {
    save(
      "bank",
      settings.bank.map((b) =>
        b.id === editingId ? { ...b, ...bankForm } : b
      )
    );

    setEditingId(null);
    showSuccess("Bank diperbarui");
  };

  const editBank = (b) => {
    setBankForm(b);
    setEditingId(b.id);
  };

  // ================= EWALLET =================
  const addEwallet = () => {
    if (!ewalletForm.name) return showError("Isi data!");

    save("ewallet", [
      ...settings.ewallet,
      { id: Date.now(), ...ewalletForm }
    ]);

    setEwalletForm({ name: "", number: "" });
    showSuccess("E-wallet ditambahkan");
  };

  const editEwallet = (e) => {
    setEwalletForm(e);
    setEditingId(e.id);
  };

  const updateEwallet = () => {
    save(
      "ewallet",
      settings.ewallet.map((e) =>
        e.id === editingId ? { ...e, ...ewalletForm } : e
      )
    );

    setEditingId(null);
    showSuccess("E-wallet diperbarui");
  };

  // ================= CITY =================
  const addCity = () => {
    if (!cityForm.name) return showError("Isi nama kota!");

    save("cities", [...settings.cities, { id: Date.now(), ...cityForm }]);

    setCityForm({ name: "", cost: 0 });
    showSuccess("Kota ditambahkan");
  };

  const editCity = (c) => {
    setCityForm(c);
    setEditingId(c.id);
  };

  const updateCity = () => {
    save(
      "cities",
      settings.cities.map((c) =>
        c.id === editingId ? { ...c, ...cityForm } : c
      )
    );

    setEditingId(null);
    showSuccess("Kota diperbarui");
  };

  // ================= SHIPPING =================
  const saveFreeShipping = () => {
    save("freeShippingThreshold", freeShippingForm);
    showSuccess("Gratis ongkir disimpan");
  };

  // ================= QRIS =================
  const handleQrisImageUpload = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      setQrisPreview(reader.result);
      setQrisForm({ image: reader.result });
    };

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const saveQris = () => {
    save("qris", qrisForm);
    showSuccess("QRIS disimpan");
  };

  const saveWhatsApp = () => {
    save("whatsappAdmin", whatsappForm);
    showSuccess("WhatsApp disimpan");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-6">
        Pengaturan Pembayaran
      </h1>

      {/* TAB */}
      <div className="flex gap-2 mb-6">
        {["bank", "ewallet", "ongkir", "qris"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn-secondary"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BANK */}
      {activeTab === "bank" && (
        <BankSection
          settings={settings}
          bankForm={bankForm}
          setBankForm={setBankForm}
          editingBankId={editingId}
          handleAddBank={addBank}
          handleUpdateBank={updateBank}
          handleEditBank={editBank}
          handleDeleteBank={(id, name) =>
            removeItem("bank", id, name)
          }
        />
      )}

      {/* EWALLET */}
      {activeTab === "ewallet" && (
        <EwalletSection
          settings={settings}
          ewalletForm={ewalletForm}
          setEwalletForm={setEwalletForm}
          editingEwalletId={editingId}
          handleAddEwallet={addEwallet}
          handleUpdateEwallet={updateEwallet}
          handleEditEwallet={editEwallet}
          handleDeleteEwallet={(id, name) =>
            removeItem("ewallet", id, name)
          }
        />
      )}

      {/* SHIPPING */}
      {activeTab === "ongkir" && (
        <ShippingSection
          settings={settings}
          cityForm={cityForm}
          setCityForm={setCityForm}
          editingCityId={editingId}
          handleAddCity={addCity}
          handleUpdateCity={updateCity}
          handleEditCity={editCity}
          handleDeleteCity={(id, name) =>
            removeItem("cities", id, name)
          }
          freeShippingForm={freeShippingForm}
          setFreeShippingForm={setFreeShippingForm}
          handleSaveFreeShipping={saveFreeShipping}
        />
      )}

      {/* QRIS */}
      {activeTab === "qris" && (
        <QrisSection
          qrisPreview={qrisPreview}
          handleQrisImageUpload={handleQrisImageUpload}
          handleSaveQris={saveQris}
          whatsappForm={whatsappForm}
          setWhatsappForm={setWhatsappForm}
          handleSaveWhatsApp={saveWhatsApp}
        />
      )}

    </div>
  );
}
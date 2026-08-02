"use client";

import React, { useState } from "react";
import { Typography, Button, Input, Textarea } from "@material-tailwind/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.error || "Xabarni yuborishda xatolik yuz berdi. Qayta urinib ko&apos;ring.");
      }
    } catch (err) {
      setError("Tarmoq xatoligi! Internet aloqasini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-8"
      style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <Typography variant="h6" className="mb-2 tracking-widest uppercase text-sm text-blue-500">
            Biz bilan bog&apos;laning
          </Typography>
          <Typography variant="h2" color="blue-gray" className="font-bold mb-4">
            Loyihangizni{" "}
            <span className="text-blue-500">Muhokama Qilaylik</span>
          </Typography>
          <Typography variant="lead" className="!text-gray-500 lg:w-2/3 mx-auto">
            Yillar davomida to&apos;plangan tajriba va yuzlab muvaffaqiyatli loyihalar orqali biz mijozlarimizning ishonchini qozonib kelmoqdamiz. Biznesni avtomatlashtirish, dastur yaratish yoki konsultatsiya uchun — biz doim tayyor. Bepul maslahat uchun murojaat qiling!
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 justify-center">
            <div
              className="rounded-2xl p-8 text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #0d1f5c, #0e3a6e)" }}
            >
              <Typography variant="h4" color="white" className="mb-6 font-bold">
                Ko&apos;p beriladigan savollari
              </Typography>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(56,189,248,0.15)" }}>
                    <PhoneIcon className="h-5 w-5" style={{ color: "#38bdf8" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="opacity-60 mb-0.5">Telefon</Typography>
                    <Typography color="white" className="font-semibold">+998 93 567 30 30</Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(56,189,248,0.15)" }}>
                    <EnvelopeIcon className="h-5 w-5" style={{ color: "#38bdf8" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="opacity-60 mb-0.5">Email</Typography>
                    <Typography color="white" className="font-semibold">info@imkonsoft.uz</Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(56,189,248,0.15)" }}>
                    <MapPinIcon className="h-5 w-5" style={{ color: "#38bdf8" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="opacity-60 mb-0.5">Manzil</Typography>
                    <Typography color="white" className="font-semibold">Farg&apos;ona viloyati, O&apos;zbekiston</Typography>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Typography variant="small" className="opacity-60 mb-3">Ijtimoiy tarmoqlar</Typography>
                <div className="flex gap-3 flex-wrap">
                  {["Telegram", "Instagram", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                <Typography variant="h4" color="blue-gray" className="font-bold mb-2">
                  Xabaringiz yuborildi!
                </Typography>
                <Typography className="!text-gray-500">
                  Tez orada mutaxassislarimiz siz bilan bog&apos;lanishadi.
                </Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
                  Murojaat Qoldiring
                </Typography>

                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1.5 font-medium">
                    Ismingiz *
                  </Typography>
                  <Input
                    id="contact-name"
                    size="lg"
                    placeholder="Ismingizni kiriting"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="!border-gray-300"
                    crossOrigin=""
                  />
                </div>

                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1.5 font-medium">
                    Telefon raqam *
                  </Typography>
                  <Input
                    id="contact-phone"
                    size="lg"
                    placeholder="+998 93 567 30 30"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="!border-gray-300"
                    crossOrigin=""
                  />
                </div>

                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1.5 font-medium">
                    Xabar
                  </Typography>
                  <Textarea
                    id="contact-message"
                    size="lg"
                    rows={4}
                    placeholder="Loyihangiz haqida qisqacha yozing..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="!border-gray-300"
                  />
                </div>

                {error && (
                  <Typography variant="small" color="red" className="text-center font-medium">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  className="rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Yuborilmoqda...
                    </span>
                  ) : (
                    "Yuborish"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

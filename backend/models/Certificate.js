import mongoose from "mongoose"

const CertificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issuedAt: { type: Date, required: true },
    credentialId: { type: String },
    url: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
)

export const Certificate = mongoose.model("Certificate", CertificateSchema)

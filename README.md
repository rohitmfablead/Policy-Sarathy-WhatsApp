# 🚀 WhatsApp Bulk Portal (Frontend)

A modern, responsive frontend for a **WhatsApp Bulk Messaging Portal**, built using **React + TailwindCSS**.  
This portal allows users to send bulk WhatsApp campaigns, manage contacts, create templates, upload media, and track reports.

---

## 📌 Features

### 🔹 Authentication & Dashboard
- User login & registration (JWT-based auth)
- Role-based access (Admin / Reseller / Client)
- Interactive dashboard with campaign stats

### 🔹 Contact Management
- Import contacts via **CSV/Excel/Google Contacts**
- Group creation (Audience Segmentation)
- Duplicate removal & data cleaning
- Search & filter contacts

### 🔹 Template Management
- Save reusable templates (**Marketing / Utility / OTP**)
- Rich-text editor with placeholders (e.g. `{{name}}`)
- Media attachments for templates
- WhatsApp Business API approved template (HSM) support

### 🔹 Media Library
- Upload & reuse images, videos, PDFs
- Drag & Drop uploader with preview
- File size limit warnings (e.g. `20MB for videos`)
- Organized media grid/list view

### 🔹 Campaign Management
- Create, schedule, and manage bulk campaigns
- Attach templates or custom messages
- Select audiences (Groups / Segments)
- Track delivery, read, and failure stats

### 🔹 Reports & Analytics
- Campaign performance dashboard
- Export reports (CSV, Excel, PDF)
- Message logs with status tracking

---

## 🛠️ Tech Stack

- **React 18+**
- **Tailwind CSS** (UI styling)
- **Framer Motion** (animations)
- **React Router** (routing)
- **Axios / Fetch** (API integration)
- **ShadCN/UI** components

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/WhatsApp_Bulk_Portal_Frontend.git
cd WhatsApp_Bulk_Portal_Frontend

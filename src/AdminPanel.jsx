import React, { useState } from 'react';
import { X, Image, Type, RotateCcw } from 'lucide-react';

const AdminPanel = ({ content, onUpdate, onClose, onReset }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [expandedSection, setExpandedSection] = useState('hero');

  const update = (key, value) => {
    onUpdate({ ...content, [key]: value });
  };

  const updateProduct = (index, field, value) => {
    const products = [...content.products];
    products[index] = { ...products[index], [field]: value };
    onUpdate({ ...content, products });
  };

  const updateImage = (key, value) => {
    onUpdate({
      ...content,
      images: { ...content.images, [key]: value },
    });
  };

  const sections = [
    { id: 'hero', label: 'Hero', icon: '🏠' },
    { id: 'logo', label: 'Logo & Nav', icon: '👑' },
    { id: 'mission', label: 'Mission', icon: '✝️' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'shop', label: 'Shop', icon: '🛒' },
    { id: 'products', label: 'Products', icon: '☕' },
    { id: 'newsletter', label: 'Newsletter', icon: '📧' },
    { id: 'footer', label: 'Footer', icon: '📄' },
  ];

  const Field = ({ label, value, onChange, multiline }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      )}
    </div>
  );

  const ImageField = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL"
        className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
      {value && (
        <div className="mt-2 rounded overflow-hidden border border-stone-200 max-h-24">
          <img src={value} alt="Preview" className="w-full h-24 object-cover" onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}
    </div>
  );

  const Section = ({ id, label, children }) => (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-stone-50 font-medium text-stone-800"
      >
        {label}
        <span className="text-stone-400">{expandedSection === id ? '−' : '+'}</span>
      </button>
      {expandedSection === id && <div className="px-4 pb-4">{children}</div>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg ml-auto bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50">
          <h2 className="font-serif font-bold text-lg text-stone-800">Edit Site Content</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded-md"
              title="Reset to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 text-stone-500 hover:text-stone-700 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium ${activeTab === 'text' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-stone-600 hover:text-stone-800'}`}
          >
            <Type className="w-4 h-4" /> Text
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium ${activeTab === 'images' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-stone-600 hover:text-stone-800'}`}
          >
            <Image className="w-4 h-4" /> Images
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'text' && (
            <div className="space-y-2">
              <Section id="hero" label="Hero Section">
                <Field label="Tagline" value={content.heroTagline} onChange={(v) => update('heroTagline', v)} />
                <Field label="Headline Line 1" value={content.heroHeadline1} onChange={(v) => update('heroHeadline1', v)} />
                <Field label="Headline Line 2" value={content.heroHeadline2} onChange={(v) => update('heroHeadline2', v)} />
                <Field label="Subtext" value={content.heroSubtext} onChange={(v) => update('heroSubtext', v)} multiline />
                <Field label="Primary Button" value={content.heroCtaPrimary} onChange={(v) => update('heroCtaPrimary', v)} />
                <Field label="Secondary Button" value={content.heroCtaSecondary} onChange={(v) => update('heroCtaSecondary', v)} />
              </Section>
              <Section id="logo" label="Logo & Brand">
                <Field label="Logo Title" value={content.logoTitle} onChange={(v) => update('logoTitle', v)} />
                <Field label="Logo Subtitle" value={content.logoSubtitle} onChange={(v) => update('logoSubtitle', v)} />
              </Section>
              <Section id="mission" label="Mission Section">
                <Field label="Section Title" value={content.missionTitle} onChange={(v) => update('missionTitle', v)} />
                <Field label="Mission Paragraph" value={content.missionParagraph} onChange={(v) => update('missionParagraph', v)} multiline />
                <Field label="Equation: Quality Coffee" value={content.equationCoffee} onChange={(v) => update('equationCoffee', v)} />
                <Field label="Equation: Our Mission" value={content.equationMission} onChange={(v) => update('equationMission', v)} />
                <Field label="Equation: Result Title" value={content.equationResult} onChange={(v) => update('equationResult', v)} />
                <Field label="Equation: Result Subtitle" value={content.equationResultSub} onChange={(v) => update('equationResultSub', v)} />
              </Section>
              <Section id="features" label="Features">
                <Field label="Feature 1 Title" value={content.feature1Title} onChange={(v) => update('feature1Title', v)} />
                <Field label="Feature 1 Description" value={content.feature1Desc} onChange={(v) => update('feature1Desc', v)} multiline />
                <Field label="Feature 2 Title" value={content.feature2Title} onChange={(v) => update('feature2Title', v)} />
                <Field label="Feature 2 Description" value={content.feature2Desc} onChange={(v) => update('feature2Desc', v)} multiline />
                <Field label="Feature 3 Title" value={content.feature3Title} onChange={(v) => update('feature3Title', v)} />
                <Field label="Feature 3 Description" value={content.feature3Desc} onChange={(v) => update('feature3Desc', v)} multiline />
              </Section>
              <Section id="shop" label="Shop Section">
                <Field label="Tagline" value={content.shopTagline} onChange={(v) => update('shopTagline', v)} />
                <Field label="Title" value={content.shopTitle} onChange={(v) => update('shopTitle', v)} />
                <Field label="View All Button" value={content.shopViewAll} onChange={(v) => update('shopViewAll', v)} />
              </Section>
              <Section id="products" label="Products">
                {content.products?.map((p, i) => (
                  <div key={p.id} className="mb-6 p-3 bg-stone-50 rounded-lg">
                    <h5 className="font-semibold text-stone-700 mb-3">Product {i + 1}</h5>
                    <Field label="Name" value={p.name} onChange={(v) => updateProduct(i, 'name', v)} />
                    <Field label="Roast" value={p.roast} onChange={(v) => updateProduct(i, 'roast', v)} />
                    <Field label="Price" value={String(p.price)} onChange={(v) => updateProduct(i, 'price', parseFloat(v) || 0)} />
                    <Field label="Description" value={p.description} onChange={(v) => updateProduct(i, 'description', v)} multiline />
                  </div>
                ))}
              </Section>
              <Section id="newsletter" label="Newsletter">
                <Field label="Title" value={content.newsletterTitle} onChange={(v) => update('newsletterTitle', v)} />
                <Field label="Subtext" value={content.newsletterSubtext} onChange={(v) => update('newsletterSubtext', v)} multiline />
                <Field label="Button Text" value={content.newsletterButton} onChange={(v) => update('newsletterButton', v)} />
                <Field label="Placeholder" value={content.newsletterPlaceholder} onChange={(v) => update('newsletterPlaceholder', v)} />
              </Section>
              <Section id="footer" label="Footer">
                <Field label="Brand Title" value={content.footerBrandTitle} onChange={(v) => update('footerBrandTitle', v)} />
                <Field label="Brand Subtitle" value={content.footerBrandSubtitle} onChange={(v) => update('footerBrandSubtitle', v)} />
                <Field label="About Paragraph" value={content.footerAbout} onChange={(v) => update('footerAbout', v)} multiline />
                <Field label="Quick Links Title" value={content.footerQuickLinksTitle} onChange={(v) => update('footerQuickLinksTitle', v)} />
                <Field label="Contact Title" value={content.footerContactTitle} onChange={(v) => update('footerContactTitle', v)} />
                <Field label="Link: Home" value={content.footerLinkHome} onChange={(v) => update('footerLinkHome', v)} />
                <Field label="Link: About Us" value={content.footerLinkAbout} onChange={(v) => update('footerLinkAbout', v)} />
                <Field label="Link: Who We Support" value={content.footerLinkSupport} onChange={(v) => update('footerLinkSupport', v)} />
                <Field label="Link: Shop" value={content.footerLinkShop} onChange={(v) => update('footerLinkShop', v)} />
                <Field label="Email" value={content.footerEmail} onChange={(v) => update('footerEmail', v)} />
                <Field label="Instagram Text" value={content.footerInstagramText} onChange={(v) => update('footerInstagramText', v)} />
                <Field label="Copyright" value={content.footerCopyright} onChange={(v) => update('footerCopyright', v)} />
                <Field label="Tagline" value={content.footerTagline} onChange={(v) => update('footerTagline', v)} />
              </Section>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <ImageField
                label="Hero Background"
                value={content.images?.heroBackground}
                onChange={(v) => updateImage('heroBackground', v)}
              />
              <ImageField
                label="Mission: Coffee Image"
                value={content.images?.equationCoffee}
                onChange={(v) => updateImage('equationCoffee', v)}
              />
              <ImageField
                label="Mission: Bible/Mission Image"
                value={content.images?.equationMission}
                onChange={(v) => updateImage('equationMission', v)}
              />
              <ImageField
                label="Footer Background"
                value={content.images?.footerBackground}
                onChange={(v) => updateImage('footerBackground', v)}
              />
              <div className="border-t border-stone-200 pt-4 mt-6">
                <h4 className="font-semibold text-stone-700 mb-3">Product Images</h4>
                {content.products?.map((p, i) => (
                  <ImageField
                    key={p.id}
                    label={`Product ${i + 1}: ${p.name}`}
                    value={p.image}
                    onChange={(v) => updateProduct(i, 'image', v)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState } from 'react';
import { X, Image, Type, RotateCcw } from 'lucide-react';

// Defined outside AdminPanel so they keep stable identity across re-renders (prevents input focus loss)
const Field = ({ label, value, onChange, multiline }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">{label}</label>
    {multiline ? (
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        rows={3}
      />
    ) : (
      <input
        type="text"
        value={value ?? ''}
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
      value={value ?? ''}
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

const Section = ({ id, label, isExpanded, onToggle, children }) => (
  <div className="border-b border-stone-200 last:border-0">
    <button
      type="button"
      onClick={() => onToggle(isExpanded ? null : id)}
      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-stone-50 font-medium text-stone-800"
    >
      {label}
      <span className="text-stone-400">{isExpanded ? '−' : '+'}</span>
    </button>
    {isExpanded && <div className="px-4 pb-4">{children}</div>}
  </div>
);

const AdminPanel = ({ content, onUpdate, onClose, onReset }) => {
  const [activeTab, setActiveTab] = useState('text');
  const [expandedSection, setExpandedSection] = useState('hero');
  const [localContent, setLocalContent] = useState(content);

  // Sync local content when content prop changes (e.g. from reset)
  React.useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const update = (key, value) => {
    const next = { ...localContent, [key]: value };
    setLocalContent(next);
    onUpdate(next);
  };

  const updateProduct = (index, field, value) => {
    const products = [...(localContent.products || [])];
    products[index] = { ...products[index], [field]: value };
    const next = { ...localContent, products };
    setLocalContent(next);
    onUpdate(next);
  };

  const updateImage = (key, value) => {
    const next = {
      ...localContent,
      images: { ...(localContent.images || {}), [key]: value },
    };
    setLocalContent(next);
    onUpdate(next);
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[256px] ml-auto bg-white shadow-2xl overflow-hidden flex flex-col">
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
              <Section id="hero" label="Hero Section" isExpanded={expandedSection === 'hero'} onToggle={setExpandedSection}>
                <Field fieldKey="hero-tagline" label="Tagline" value={localContent.heroTagline} onChange={(v) => update('heroTagline', v)} />
                <Field label="Headline Line 1" value={localContent.heroHeadline1} onChange={(v) => update('heroHeadline1', v)} />
                <Field label="Headline Line 2" value={localContent.heroHeadline2} onChange={(v) => update('heroHeadline2', v)} />
                <Field fieldKey="hero-sub" label="Subtext" value={localContent.heroSubtext} onChange={(v) => update('heroSubtext', v)} multiline />
                <Field label="Primary Button" value={localContent.heroCtaPrimary} onChange={(v) => update('heroCtaPrimary', v)} />
                <Field fieldKey="hero-cta2" label="Secondary Button" value={localContent.heroCtaSecondary} onChange={(v) => update('heroCtaSecondary', v)} />
              </Section>
              <Section id="logo" label="Logo & Brand" isExpanded={expandedSection === 'logo'} onToggle={setExpandedSection}>
                <Field fieldKey="logo-title" label="Logo Title" value={localContent.logoTitle} onChange={(v) => update('logoTitle', v)} />
                <Field label="Logo Subtitle" value={localContent.logoSubtitle} onChange={(v) => update('logoSubtitle', v)} />
              </Section>
              <Section id="mission" label="Mission Section" isExpanded={expandedSection === 'mission'} onToggle={setExpandedSection}>
                <Field fieldKey="mission-title" label="Section Title" value={localContent.missionTitle} onChange={(v) => update('missionTitle', v)} />
                <Field label="Mission Paragraph" value={localContent.missionParagraph} onChange={(v) => update('missionParagraph', v)} multiline />
                <Field label="Equation: Quality Coffee" value={localContent.equationCoffee} onChange={(v) => update('equationCoffee', v)} />
                <Field fieldKey="eq-mission" label="Equation: Our Mission" value={localContent.equationMission} onChange={(v) => update('equationMission', v)} />
                <Field fieldKey="eq-result" label="Equation: Result Title" value={localContent.equationResult} onChange={(v) => update('equationResult', v)} />
                <Field label="Equation: Result Subtitle" value={localContent.equationResultSub} onChange={(v) => update('equationResultSub', v)} />
              </Section>
              <Section id="features" label="Features" isExpanded={expandedSection === 'features'} onToggle={setExpandedSection}>
                <Field fieldKey="f1-t" label="Feature 1 Title" value={localContent.feature1Title} onChange={(v) => update('feature1Title', v)} />
                <Field label="Feature 1 Description" value={localContent.feature1Desc} onChange={(v) => update('feature1Desc', v)} multiline />
                <Field label="Feature 2 Title" value={localContent.feature2Title} onChange={(v) => update('feature2Title', v)} />
                <Field fieldKey="f2-d" label="Feature 2 Description" value={localContent.feature2Desc} onChange={(v) => update('feature2Desc', v)} multiline />
                <Field label="Feature 3 Title" value={localContent.feature3Title} onChange={(v) => update('feature3Title', v)} />
                <Field label="Feature 3 Description" value={localContent.feature3Desc} onChange={(v) => update('feature3Desc', v)} multiline />
              </Section>
              <Section id="shop" label="Shop Section" isExpanded={expandedSection === 'shop'} onToggle={setExpandedSection}>
                <Field fieldKey="shop-tag" label="Tagline" value={localContent.shopTagline} onChange={(v) => update('shopTagline', v)} />
                <Field fieldKey="shop-title" label="Title" value={localContent.shopTitle} onChange={(v) => update('shopTitle', v)} />
                <Field label="View All Button" value={localContent.shopViewAll} onChange={(v) => update('shopViewAll', v)} />
              </Section>
              <Section id="products" label="Products" isExpanded={expandedSection === 'products'} onToggle={setExpandedSection}>
                {(localContent.products || []).map((p, i) => (
                  <div key={p.id} className="mb-6 p-3 bg-stone-50 rounded-lg">
                    <h5 className="font-semibold text-stone-700 mb-3">Product {i + 1}</h5>
                    <Field label="Name" value={p.name} onChange={(v) => updateProduct(i, 'name', v)} />
                    <Field label="Roast" value={p.roast} onChange={(v) => updateProduct(i, 'roast', v)} />
                    <Field label="Price" value={String(p.price)} onChange={(v) => updateProduct(i, 'price', parseFloat(v) || 0)} />
                    <Field label="Description" value={p.description} onChange={(v) => updateProduct(i, 'description', v)} multiline />
                  </div>
                ))}
              </Section>
              <Section id="newsletter" label="Newsletter" isExpanded={expandedSection === 'newsletter'} onToggle={setExpandedSection}>
                <Field label="Title" value={localContent.newsletterTitle} onChange={(v) => update('newsletterTitle', v)} />
                <Field label="Subtext" value={localContent.newsletterSubtext} onChange={(v) => update('newsletterSubtext', v)} multiline />
                <Field label="Button Text" value={localContent.newsletterButton} onChange={(v) => update('newsletterButton', v)} />
                <Field label="Placeholder" value={localContent.newsletterPlaceholder} onChange={(v) => update('newsletterPlaceholder', v)} />
              </Section>
              <Section id="footer" label="Footer" isExpanded={expandedSection === 'footer'} onToggle={setExpandedSection}>
                <Field label="Brand Title" value={localContent.footerBrandTitle} onChange={(v) => update('footerBrandTitle', v)} />
                <Field label="Brand Subtitle" value={localContent.footerBrandSubtitle} onChange={(v) => update('footerBrandSubtitle', v)} />
                <Field label="About Paragraph" value={localContent.footerAbout} onChange={(v) => update('footerAbout', v)} multiline />
                <Field label="Quick Links Title" value={localContent.footerQuickLinksTitle} onChange={(v) => update('footerQuickLinksTitle', v)} />
                <Field label="Contact Title" value={localContent.footerContactTitle} onChange={(v) => update('footerContactTitle', v)} />
                <Field label="Link: Home" value={localContent.footerLinkHome} onChange={(v) => update('footerLinkHome', v)} />
                <Field label="Link: About Us" value={localContent.footerLinkAbout} onChange={(v) => update('footerLinkAbout', v)} />
                <Field label="Link: Who We Support" value={localContent.footerLinkSupport} onChange={(v) => update('footerLinkSupport', v)} />
                <Field label="Link: Shop" value={localContent.footerLinkShop} onChange={(v) => update('footerLinkShop', v)} />
                <Field label="Email" value={localContent.footerEmail} onChange={(v) => update('footerEmail', v)} />
                <Field label="Instagram Text" value={localContent.footerInstagramText} onChange={(v) => update('footerInstagramText', v)} />
                <Field label="Copyright" value={localContent.footerCopyright} onChange={(v) => update('footerCopyright', v)} />
                <Field label="Tagline" value={localContent.footerTagline} onChange={(v) => update('footerTagline', v)} />
              </Section>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              <ImageField
                label="Hero Background"
                value={localContent.images?.heroBackground}
                onChange={(v) => updateImage('heroBackground', v)}
              />
              <ImageField
                label="Mission: Coffee Image"
                value={localContent.images?.equationCoffee}
                onChange={(v) => updateImage('equationCoffee', v)}
              />
              <ImageField
                label="Mission: Bible/Mission Image"
                value={localContent.images?.equationMission}
                onChange={(v) => updateImage('equationMission', v)}
              />
              <ImageField
                label="Footer Background"
                value={localContent.images?.footerBackground}
                onChange={(v) => updateImage('footerBackground', v)}
              />
              <div className="border-t border-stone-200 pt-4 mt-6">
                <h4 className="font-semibold text-stone-700 mb-3">Product Images</h4>
                {(localContent.products || []).map((p, i) => (
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

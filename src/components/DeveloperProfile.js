'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLaptopCode, FaLocationDot, FaCircleCheck } from 'react-icons/fa6';
import OrderDemo from '@/components/developer/OrderDemo';
import LanguageDemo from '@/components/developer/LanguageDemo';
import '@/app/[locale]/tasarim-gelistirme/case-study.css';

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, facts, story, branches, experience, languages, engineering, closing } = content;

  const menuUrl = lang === 'tr' ? '/menu' : `/${lang}/menu`;
  const aboutUrl = lang === 'tr' ? '/about' : `/${lang}/about`;

  return (
    <article className="dev-case-study" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. HERO SECTION */}
      <section className="hero" id="top" aria-label="Lucky Sushi Digital Case Study Hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <FaLaptopCode className="eyebrow-icon" /> {hero.eyebrowTag}{' '}
              <span className="eyebrow-divider">/</span> {hero.eyebrowCity}
            </p>

            <h1>
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
              <em>{hero.titleEm}</em>
              <br />
              {hero.titleLine3}
            </h1>

            <p className="hero-description">{hero.description}</p>

            <div className="hero-actions">
              <a className="button button--red" href="#story">
                {hero.ctaExplore} <span aria-hidden="true">{isRTL ? '↓' : '↓'}</span>
              </a>
              <Link className="button button--quiet" href={menuUrl}>
                {hero.ctaMenu} <span aria-hidden="true">{isRTL ? '↖' : '↗'}</span>
              </Link>
            </div>

            <div className="hero-credit">
              <span className="credit-avatar">{hero.devAvatar}</span>
              <span>
                <b>{hero.devName}</b>
                <small>{hero.devRole}</small>
              </span>
              <span className="credit-line" aria-hidden="true" />
              <span className="hero-issue">{hero.devIssue}</span>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Lucky Sushi rolls and craft presentation"
          >
            <div className="hero-image-frame">
              <Image
                src="/images/developer/lucky-rolls.jpg"
                alt="Lucky Sushi rolls on slate plate"
                className="hero-food-image"
                width={525}
                height={520}
                priority
              />
              <div className="image-vignette" aria-hidden="true" />
              <span className="image-caption">
                FRESH FROM THE LUCKY KITCHEN <span>ISTANBUL</span>
              </span>
            </div>

            <div
              className="hero-roundel"
              aria-label="Alibeyköy branch open until 04:00 every day"
            >
              <span className="roundel-top">{hero.roundelTop}</span>
              <strong>
                {hero.roundelHour}
                <small>:</small>
                {hero.roundelMinute}
              </strong>
              <span className="roundel-bottom">{hero.roundelBottom}</span>
            </div>

            <div className="hero-note">
              <Image
                src="/images/developer/lucky-logo.png"
                alt="Lucky Logo"
                width={40}
                height={30}
              />
              <div>
                <b>{hero.noteTitle}</b>
                <br />
                {hero.noteSubtitle}
              </div>
            </div>

            <div className="hero-side-label">{hero.sideLabel}</div>
          </div>
        </div>

        <div className="hero-bottomline">
          <span>{hero.bottomline}</span>
          <a href="#facts">
            {hero.scrollDown} <b aria-hidden="true">{isRTL ? '↓' : '↓'}</b>
          </a>
        </div>
      </section>

      {/* 2. FACTS STRIP */}
      <section className="facts-strip" id="facts" aria-label="Project Scope and Metrics">
        <div className="fact-intro">
          <span className="section-tag">{facts.tag}</span>
          <b>{facts.title}</b>
        </div>
        <div className="fact">
          <strong>{facts.languages}</strong>
          <span>{facts.languagesLabel}</span>
        </div>
        <div className="fact">
          <strong>{facts.branches}</strong>
          <span>{facts.branchesLabel}</span>
        </div>
        <div className="fact">
          <strong>
            {facts.closingHour}
            <span className="fact-small">{facts.closingMinute}</span>
          </strong>
          <span>{facts.closingLabel}</span>
        </div>
        <div className="fact-stamp" aria-hidden="true">
          {facts.stampCity}
          <br />
          <b>{facts.stampCountry}</b>
        </div>
      </section>

      {/* 3. STORY SECTION */}
      <section className="story-section section-pad" id="story">
        <div className="section-index">
          <span>{story.index}</span>
          <i /> {story.sectionName}
        </div>

        <div className="story-layout">
          <div className="story-headline">
            <p className="section-tag">{story.tag}</p>
            <h2>
              {story.h2Part1}
              <br />
              <em>{story.h2Em}</em> {story.h2Part2}
            </h2>
          </div>

          <div className="story-copy">
            <p className="lead-copy">{story.lead}</p>
            <p>{story.p}</p>
            <Link className="text-link" href={aboutUrl}>
              {story.linkText} <span aria-hidden="true">{isRTL ? '↖' : '↗'}</span>
            </Link>
          </div>
        </div>

        <div className="story-photo-band">
          <img
            src="/images/developer/lucky-store.jpg"
            alt="Lucky Sushi Istanbul Neon Bar & Fresh Rolls"
            className="story-band-bg-img"
            loading="eager"
          />
          <div className="photo-band-overlay" />
          <div className="photo-band-label">
            <span>{story.photoBadge}</span>
            <b>{story.photoHeadline}</b>
          </div>
          <div className="photo-band-number">
            {story.photoLocation}
            <br />
            <strong>{story.photoCoord}</strong>
          </div>
        </div>

        <div className="principles-row">
          {story.principles.map((pr, idx) => {
            const principleImages = [
              '/images/set-salmon-lovers.jpg',
              '/images/developer/lucky-front.jpg',
              '/images/developer/lucky-store.jpg',
            ];
            return (
              <div key={idx} className="principle-card">
                <div className="principle-card__media">
                  <img
                    src={principleImages[idx]}
                    alt={pr.num}
                    className="principle-card__img"
                    loading="lazy"
                  />
                </div>
                <div className="principle-card__text">
                  <span>{pr.num}</span>
                  <p>{pr.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BRANCHES SECTION */}
      <section className="branch-section section-pad" id="branches">
        <div className="section-index section-index--light">
          <span>{branches.index}</span>
          <i /> {branches.sectionName}
        </div>

        <div className="branch-heading-row">
          <div>
            <p className="section-tag section-tag--light">{branches.tag}</p>
            <h2>
              {branches.h2Part1}
              <br />
              <em>{branches.h2Em}</em>
            </h2>
          </div>
          <p className="branch-intro">{branches.intro}</p>
        </div>

        <div className="branch-map-card">
          <div
            className="branch-map-visual"
            aria-label="Schematic routing of the three Istanbul Lucky branches"
          >
            <div className="map-grid" aria-hidden="true" />
            <svg
              className="route-lines"
              viewBox="0 0 620 260"
              fill="none"
              aria-hidden="true"
            >
              <path d="M72 200C160 178 189 84 288 98C383 111 404 205 548 177" />
              <path d="M72 200C166 224 198 180 288 98" />
              <path d="M288 98C362 37 453 70 548 177" />
              <circle cx="72" cy="200" r="7" />
              <circle cx="288" cy="98" r="7" />
              <circle cx="548" cy="177" r="7" />
            </svg>
            <span className="map-label map-label--one">
              ALİBEYKÖY <b>01</b>
            </span>
            <span className="map-label map-label--two">
              ZEYTİNBURNU <b>02</b>
            </span>
            <span className="map-label map-label--three">
              REŞİTPAŞA <b>03</b>
            </span>
            <div className="map-caption">
              <FaLocationDot className="map-caption-icon" /> {branches.mapCaption}{' '}
              <span>{branches.mapScale}</span>
            </div>
          </div>

          <div className="branch-list">
            {branches.list.map((branch, idx) => {
              const branchThumbnails = [
                '/images/floter.jpg',
                '/images/developer/lucky-front.jpg',
                '/images/shrimp-ramen.jpg',
              ];
              return (
                <article className="branch-row" key={branch.number}>
                  <div className="branch-row__thumb">
                    <img
                      src={branchThumbnails[idx]}
                      alt={branch.name}
                      className="branch-row__img"
                      loading="lazy"
                    />
                  </div>
                  <span className="branch-row__number">{branch.number}</span>
                  <div className="branch-row__main">
                    <h3>{branch.name}</h3>
                    <p>{branch.type}</p>
                    <small>{branch.areas}</small>
                  </div>
                  <div className="branch-row__hours">
                    <b>{branch.hours}</b>
                    <span>{branch.schedule}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p className="branch-footnote">{branches.footnote}</p>
      </section>

      {/* 5. EXPERIENCE SECTION (INTERACTIVE PHONE DEMO) */}
      <section className="experience-section section-pad" id="experience">
        <div className="section-index">
          <span>{experience.index}</span>
          <i /> {experience.sectionName}
        </div>

        <div className="experience-header">
          <div>
            <p className="section-tag">{experience.tag}</p>
            <h2>
              {experience.h2Part1}
              <br />
              <em>{experience.h2Em}</em>
            </h2>
          </div>
          <p>{experience.intro}</p>
        </div>

        <div className="experience-grid">
          <div className="phone-stage">
            <div className="phone-orbit phone-orbit--one" aria-hidden="true" />
            <div className="phone-orbit phone-orbit--two" aria-hidden="true" />
            <OrderDemo lang={lang} />
            <span className="phone-stage-caption">{experience.stageCaption}</span>
          </div>

          <div className="experience-side">
            {experience.notes.map((note, idx) => (
              <div className="experience-note" key={idx}>
                <span className="note-symbol">{note.symbol}</span>
                <div>
                  <b>{note.title}</b>
                  <p>{note.desc}</p>
                </div>
              </div>
            ))}

            <Link className="live-menu-card" href={menuUrl}>
              <div>
                <span>{experience.liveMenuTag}</span>
                <b style={{ whiteSpace: 'pre-line' }}>{experience.liveMenuTitle}</b>
              </div>
              <span className="live-menu-arrow" aria-hidden="true">
                {isRTL ? '↖' : '↗'}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MULTILINGUAL SECTION (INTERACTIVE 5-LANGUAGE DEMO) */}
      <section className="language-section section-pad" id="languages">
        <div className="section-index section-index--light">
          <span>{languages.index}</span>
          <i /> {languages.sectionName}
        </div>

        <div className="language-layout">
          <div className="language-copy">
            <p className="section-tag section-tag--light">{languages.tag}</p>
            <h2>
              {languages.h2Part1}
              <br />
              <em>{languages.h2Em}</em>
              <br />
              {languages.h2Part2}
            </h2>
            <p>{languages.intro}</p>
            <div className="language-specs">
              {languages.specs.map((sp, idx) => (
                <span key={idx}>
                  <b>{sp.b}</b>
                  {sp.label}
                </span>
              ))}
            </div>
          </div>

          <LanguageDemo initialLang={lang} />
        </div>

        <div className="language-bottomnote">
          <span>{languages.bottom1}</span>
          <span>
            <b>{languages.bottom2}</b>
          </span>
        </div>
      </section>

      {/* 7. ENGINEERING SECTION */}
      <section className="engineering-section section-pad" id="engineering">
        <div className="section-index">
          <span>{engineering.index}</span>
          <i /> {engineering.sectionName}
        </div>

        <div className="engineering-heading">
          <div>
            <p className="section-tag">{engineering.tag}</p>
            <h2>
              {engineering.h2Part1}
              <br />
              <em>{engineering.h2Em}</em>
            </h2>
          </div>
          <p>{engineering.intro}</p>
        </div>

        <div className="architecture-list">
          {engineering.items.map((item) => (
            <article className="architecture-item" key={item.number}>
              <span className="architecture-number">{item.number}</span>
              <div className="architecture-title">
                <span>{item.cat}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
              <span className="architecture-glyph" aria-hidden="true">
                {item.glyph}
              </span>
            </article>
          ))}
        </div>

        <div className="stack-rail">
          <span>{engineering.stackLabel}</span>
          <div>
            {engineering.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="seo-note">
          <span className="seo-note__mark">{engineering.seoNoteMark}</span>
          <div>
            <b>{engineering.seoNoteTitle}</b>
            <p>{engineering.seoNoteDesc}</p>
          </div>
          <span className="seo-note__status">
            <FaCircleCheck className="status-icon" /> {engineering.seoNoteStatus}
          </span>
        </div>
      </section>

      {/* 8. CLOSING SECTION */}
      <section className="closing-section">
        <img
          src="/images/floter.jpg"
          alt="Lucky Sushi Istanbul Storefront Facade"
          className="closing-photo"
          loading="lazy"
        />
        <div className="closing-scrim" />
        <div className="closing-content">
          <span className="closing-overline">{closing.overline}</span>
          <h2>
            {closing.h2Part1}
            <br />
            <em>{closing.h2Em}</em>
            <br />
            {closing.h2Part2}
          </h2>
          <p>{closing.desc}</p>
          <div className="closing-actions">
            <a
              className="button button--red"
              href={closing.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {closing.ctaTalk} <span aria-hidden="true">{isRTL ? '↖' : '↗'}</span>
            </a>
            <a
              className="button button--outline"
              href={closing.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {closing.ctaPortfolio} <span aria-hidden="true">{isRTL ? '↖' : '↗'}</span>
            </a>
          </div>
        </div>
        <div className="closing-credit">
          {closing.creditLabel} <b>{closing.creditName}</b>
        </div>
      </section>
    </article>
  );
}


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const AppColors = {
    primary: '#0c5630', // Dark Green
    secondary: '#FFFFFF', // White
    highlight: '#FFD700', // Gold/Yellow
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#2d3748', // A darker gray for better readability
    textLight: '#5a677d',
    subtleBg: '#f7fafc',
    lineColor: '#e2e8f0', // A light gray for lines/borders
};

const commonStyles = {
    container: {
        width: '90%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 15px', // Kept as px, small viewport padding
    },
    section: {
        padding: '5rem 0', // Adjusted to rem
        overflow: 'hidden' as React.CSSProperties['overflow'],
    },
    sectionTitle: {
        fontSize: 'var(--font-size-xl)', // Responsive
        color: AppColors.primary,
        marginBottom: '1.25rem', // Adjusted to rem
        textAlign: 'center' as React.CSSProperties['textAlign'],
        fontWeight: 700,
    },
    sectionSubtitle: {
        fontSize: 'var(--font-size-md)', // Responsive
        color: AppColors.textLight,
        textAlign: 'center' as React.CSSProperties['textAlign'],
        maxWidth: '700px',
        margin: '0 auto 3.5rem auto', // Adjusted to rem
        lineHeight: 1.7, // Adjusted
    },
};

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerStyle: React.CSSProperties = {
        position: 'fixed' as React.CSSProperties['position'],
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 0', // Adjusted to rem
        backgroundColor: isScrolled ? AppColors.primary : AppColors.secondary,
        boxShadow: isScrolled ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
        zIndex: 1000,
        transition: 'background-color 0.4s ease-out, box-shadow 0.4s ease-out',
    };

    const logoStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-lg)', // Responsive
        fontWeight: 800,
        color: isScrolled ? AppColors.textOnPrimary : AppColors.primary,
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    };

    return (
        <header style={headerStyle} role="banner">
            <div style={{ ...commonStyles.container, display: 'flex', justifyContent: 'center' as React.CSSProperties['justifyContent'], alignItems: 'center' as React.CSSProperties['alignItems'] }}>
                <a href="#home" style={logoStyle} aria-label="GetFund Home">GetFund</a>
            </div>
        </header>
    );
};

const HeroSection = () => {
    const heroStyle: React.CSSProperties = {
        paddingTop: '11.25rem', // Adjusted for sticky header & rem
        paddingBottom: '6.25rem', // Adjusted to rem
        backgroundColor: AppColors.secondary,
        textAlign: 'center' as React.CSSProperties['textAlign'],
    };
    const titleStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xxl)', // Responsive
        fontWeight: 800,
        color: AppColors.primary,
        marginBottom: '1.25rem', // Adjusted to rem
        maxWidth: '800px',
        margin: '0 auto 1.25rem auto',
        lineHeight: 1.3,
    };
    const subtitleStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-md)', // Responsive
        color: AppColors.textLight,
        marginBottom: '2.5rem', // Adjusted to rem
        maxWidth: '700px',
        margin: '0 auto 2.5rem auto',
        lineHeight: 1.7, // Adjusted
    };

    return (
        <section style={{...commonStyles.section, ...heroStyle}} aria-labelledby="hero-heading" id="home">
            <div style={commonStyles.container}>
                <h1 id="hero-heading" style={titleStyle}>Transform Small Savings into Smart Investments</h1>
                <p style={subtitleStyle}>GetFund lets you fund growing businesses directly and earn stable returns.</p>
                <a href="#start-investing" className="button button-primary" style={{padding: '1.125rem 2.25rem', fontSize: 'var(--font-size-base)'}}>Start Investing Now</a>
            </div>
        </section>
    );
};

const HighlightItem = ({ label, title, content }: { label: string, title: string, content: JSX.Element }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const currentItemRef = itemRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (currentItemRef) { 
                        observer.unobserve(currentItemRef); 
                    }
                }
            },
            { threshold: 0.1 } 
        );

        if (currentItemRef) {
            observer.observe(currentItemRef);
        }

        return () => {
            if (currentItemRef) { 
                 observer.unobserve(currentItemRef);
            }
        };
    }, []);


    const itemStyle: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        marginBottom: '2.5rem',  // Adjusted to rem
        padding: isMobile ? '1.25rem 1.5rem 1.75rem 1.5rem' : '1.875rem 2.5rem 2.5rem 2.5rem', // Adjusted for mobile
        backgroundColor: AppColors.secondary, 
        borderRadius: '16px', 
        boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    };

    const timelineHeaderStyle: React.CSSProperties = {
        borderTop: `1px solid ${AppColors.lineColor}`,
        paddingTop: '1.25rem', // Adjusted to rem
        marginBottom: '1rem', // Adjusted to rem
    };

    const timelineLabelStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-sm)', // Responsive
        fontWeight: 600,
        color: AppColors.primary,
        display: 'inline-block' as React.CSSProperties['display'],
    };
    
    const titleStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-lg)', // Responsive
        fontWeight: 700,
        color: AppColors.primary,
        marginBottom: '1rem', // Adjusted to rem
    };
    const contentStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-base)', // Responsive
        color: AppColors.textOnSecondary,
        lineHeight: 1.7, // Adjusted
    };

    return (
        <div ref={itemRef} style={itemStyle}>
            <div style={timelineHeaderStyle}>
                <span style={timelineLabelStyle}>• {label}</span>
            </div>
            <h3 style={titleStyle}>{title}</h3>
            <div style={contentStyle}>{content}</div>
        </div>
    );
};

const HighlightSection = () => {
    const highlights = useMemo(() => [
        {
            label: "Challenge 1: The Disconnect",
            title: "Small investors have money. Startups need money. But they never meet.",
            content: (
                <>
                    There are millions of people in India who can invest ₹5,000 to ₹50,000 — but they don’t know how to fund startups.<br />
                    Startups want funds but are stuck chasing banks or VCs.<br />
                    <strong>GetFund connects them — safely, simply, and at scale.</strong>
                </>
            )
        },
        {
            label: "Challenge 2: The Investment Dilemma",
            title: "Fixed deposits are too slow. Stocks are too risky. We’re the middle path.",
            content: (
                <>
                    Retail investors are trapped between 6% bank returns and unpredictable stock markets.<br />
                    There’s no flexible platform where they can invest in real businesses with custom return types.<br />
                    <strong>We built GetFund to offer better returns without chaos.</strong>
                </>
            )
        },
        {
            label: "Challenge 3: Democratizing Opportunity",
            title: "Startups pitch to sharks. What about the common man?",
            content: (
                <>
                    Shark Tank made startup investing cool — but only for the rich.<br />
                    Why can’t everyday people get in with ₹5K and earn interest, royalty, or equity?<br />
                    <strong>GetFund makes startup investing possible for the other 99%.</strong>
                </>
            )
        },
        {
            label: "Challenge 4: Unlocking MSME Potential",
            title: "India has 6 crore MSMEs. 67% can’t access formal funding.",
            content: (
                <>
                    That’s a massive funding gap — and also a massive missed opportunity.<br />
                    If we unlock that space with regulated, transparent retail capital…<br />
                    <strong>We don't just solve a problem — we open a whole new investment economy.</strong>
                </>
            )
        },
    ], []);

    const introTextContainerStyle: React.CSSProperties = {
        textAlign: 'center' as React.CSSProperties['textAlign'],
        marginBottom: '3.5rem', // Adjusted to rem
        maxWidth: '750px',
        margin: '0 auto 3.5rem auto',
    };
    const eyebrowStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xs)', // Responsive
        fontWeight: 600,
        color: AppColors.primary,
        textTransform: 'uppercase' as React.CSSProperties['textTransform'],
        letterSpacing: '1px',
        marginBottom: '0.625rem', // Adjusted to rem
        display: 'block' as React.CSSProperties['display'],
    };
    const introMainTitleStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xl)', // Responsive
        color: AppColors.primary,
        marginBottom: '1.25rem', // Adjusted to rem
        fontWeight: 700,
    };
    const introDescriptionStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-md)', // Responsive
        color: AppColors.textLight,
        lineHeight: 1.7, // Adjusted
    };


    return (
        <section style={{ ...commonStyles.section, backgroundColor: AppColors.subtleBg }} aria-labelledby="highlights-intro-title">
            <div style={commonStyles.container}>
                <div style={introTextContainerStyle}>
                    <span style={eyebrowStyle}>The Core Problem</span>
                    <h2 id="highlights-intro-title" style={introMainTitleStyle}>Why GetFund Exists</h2>
                    <p style={introDescriptionStyle}>
                        Key challenges in the current investment landscape and how GetFund aims to solve them, creating opportunities for both investors and businesses.
                    </p>
                </div>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {highlights.map((item, index) => (
                        <HighlightItem 
                            key={index} 
                            label={item.label}
                            title={item.title} 
                            content={item.content}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};


const benefitsData = [
    {
        icon: '💡',
        name: 'Innovative Platform',
        description: 'Seamlessly connect with a diverse range of vetted businesses seeking funding.',
    },
    {
        icon: '📈',
        name: 'Flexible Returns',
        description: 'Choose from interest, royalty, or equity-based returns to match your investment style.',
    },
    {
        icon: '🛡️',
        name: 'Secure & Transparent',
        description: 'Invest with confidence through our secure platform with clear terms and processes.',
    },
    {
        icon: '🤝',
        name: 'Empower MSMEs',
        description: 'Be a part of India\'s growth story by directly supporting small and medium enterprises.',
    },
     {
        icon: '💰',
        name: 'Accessible Investing',
        description: 'Start investing with amounts as small as ₹5,000, making it open to everyone.',
    },
    {
        icon: '🌐',
        name: 'Community Focus',
        description: 'Join a community of like-minded investors and entrepreneurs fostering economic growth.',
    },
];

const BenefitItem = ({ icon, name, description, index, isMobile }: { icon: string, name: string, description: string, index: number, isMobile: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentItemRef = itemRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (currentItemRef) {
                        observer.unobserve(currentItemRef);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (currentItemRef) {
            observer.observe(currentItemRef);
        }

        return () => {
            if (currentItemRef) {
                observer.unobserve(currentItemRef);
            }
        };
    }, []);

    const itemStyle: React.CSSProperties = {
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'row' as React.CSSProperties['flexDirection'], 
        alignItems: 'flex-start' as React.CSSProperties['alignItems'], 
        padding: '1.25rem 0', // Adjusted to rem
        backgroundColor: AppColors.secondary, 
        borderBottom: `1px solid ${AppColors.lineColor}`, 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 0.1}s`,
    };
    
    const iconContainerStyle: React.CSSProperties = {
        width: '50px', 
        height: '50px',
        borderRadius: '50%',
        backgroundColor: AppColors.primary,
        display: 'flex' as React.CSSProperties['display'],
        alignItems: 'center' as React.CSSProperties['alignItems'],
        justifyContent: 'center' as React.CSSProperties['justifyContent'],
        marginRight: isMobile ? '0.875rem' : '1.25rem', // Adjusted for mobile
        fontSize: 'var(--font-size-lg)',  // Responsive
        color: AppColors.textOnPrimary,
        flexShrink: 0,
    };

    const textContentStyle: React.CSSProperties = {
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
    };

    const nameStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-md)', // Responsive
        fontWeight: 700,
        color: AppColors.primary,
        marginBottom: '0.5rem', // Adjusted to rem
    };

    const descriptionStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-sm)', // Responsive
        color: AppColors.textOnSecondary,
        lineHeight: 1.7, // Adjusted
    };

    return (
        <div ref={itemRef} style={itemStyle}>
            <div style={iconContainerStyle} aria-hidden="true">{icon}</div>
            <div style={textContentStyle}>
                <h3 style={nameStyle}>{name}</h3>
                <p style={descriptionStyle}>{description}</p>
            </div>
        </div>
    );
};


const KeyBenefitsSection = () => {
    const sectionStyle: React.CSSProperties = {
        ...commonStyles.section,
        backgroundColor: AppColors.secondary, 
    };

    const mainContentContainerStyle: React.CSSProperties = {
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'row' as React.CSSProperties['flexDirection'],
        gap: '3.75rem', // Adjusted to rem
        alignItems: 'flex-start' as React.CSSProperties['alignItems'], 
    };

    const leftColumnStyle: React.CSSProperties = {
        flex: '1 1 45%', 
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
    };

    const rightColumnStyle: React.CSSProperties = {
        flex: '1 1 55%', 
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        gap: '0.625rem', // Adjusted to rem
    };

    const introContainerStyle: React.CSSProperties = {
        textAlign: 'left' as React.CSSProperties['textAlign'], 
        marginBottom: '1.875rem', // Adjusted to rem
    };
    const eyebrowStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xs)', // Responsive
        fontWeight: 600,
        color: AppColors.primary,
        textTransform: 'uppercase' as React.CSSProperties['textTransform'],
        letterSpacing: '1px',
        marginBottom: '0.625rem', // Adjusted to rem
        display: 'block' as React.CSSProperties['display'],
    };
    const titleStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xl)', // Responsive
        color: AppColors.primary,
        marginBottom: '1.25rem', // Adjusted to rem
        fontWeight: 700,
        lineHeight: 1.3,
    };
    const descriptionStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-md)', // Responsive
        color: AppColors.textLight,
        lineHeight: 1.7, // Adjusted
        marginBottom: '1.875rem', // Adjusted to rem
    };
    
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const responsiveMainContentContainerStyle: React.CSSProperties = {
        ...mainContentContainerStyle,
        flexDirection: isMobile ? 'column' as React.CSSProperties['flexDirection'] : 'row' as React.CSSProperties['flexDirection'],
        gap: isMobile ? '2.5rem' : '3.75rem', // Adjusted to rem
    };
    const responsiveLeftColumnStyle: React.CSSProperties = {
        ...leftColumnStyle,
        textAlign: isMobile ? 'center' as React.CSSProperties['textAlign'] : 'left' as React.CSSProperties['textAlign'],
    };
     const responsiveIntroContainerStyle: React.CSSProperties = {
        ...introContainerStyle,
        textAlign: isMobile ? 'center' as React.CSSProperties['textAlign'] : 'left' as React.CSSProperties['textAlign'],
    };


    return (
        <section style={sectionStyle} aria-labelledby="key-benefits-title">
            <div style={commonStyles.container}>
                <div style={responsiveMainContentContainerStyle}>
                    <div style={responsiveLeftColumnStyle}>
                        <div style={responsiveIntroContainerStyle}>
                            <span style={eyebrowStyle}>Advantages</span>
                            <h2 id="key-benefits-title" style={titleStyle}>Unlock Your Potential with GetFund</h2>
                            <p style={descriptionStyle}>
                                Discover the unique benefits that make GetFund the ideal platform for both investors seeking growth and businesses aiming for new heights.
                            </p>
                        </div>
                    </div>
                    <div style={rightColumnStyle}>
                        {benefitsData.map((benefit, index) => (
                            <BenefitItem 
                                key={benefit.name} 
                                icon={benefit.icon}
                                name={benefit.name}
                                description={benefit.description}
                                index={index}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowItWorksCard = ({ 
    planName, 
    planDescription, 
    featuresLabel, 
    features, 
    isVisible, 
    animationDelay,
    isMobile
}: {
    planName: string;
    planDescription: string;
    featuresLabel: string;
    features: string[];
    isVisible: boolean;
    animationDelay: string;
    isMobile: boolean;
}) => {
    const cardBaseStyle: React.CSSProperties = {
        flex: '1',
        minWidth: '280px', 
        backgroundColor: AppColors.secondary,
        borderRadius: '16px',
        padding: isMobile ? '1.25rem 1.5rem' : '1.875rem', // Adjusted for mobile
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        textAlign: 'left' as React.CSSProperties['textAlign'], 
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        justifyContent: 'space-between' as React.CSSProperties['justifyContent'], 
        alignItems: 'stretch' as React.CSSProperties['alignItems'], 
    };

    const animatedStyle: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${animationDelay}, transform 0.6s ease-out ${animationDelay}`,
    };

    const planNameStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-md)', // Responsive
        fontWeight: 600,
        color: AppColors.primary,
        marginBottom: '0.5rem', // Adjusted to rem
    };

    const planDescriptionStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-sm)', // Responsive
        color: AppColors.textLight,
        marginBottom: isMobile ? '1rem' : '1.875rem', // Adjusted for mobile
        lineHeight: 1.7, // Adjusted
    };
    
    const featuresSectionStyle: React.CSSProperties = {
        // No specific marginTop needed here, spacing handled by planDescriptionStyle.marginBottom
    };
    
    const featuresLabelStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-sm)', // Responsive
        fontWeight: 600,
        color: AppColors.textOnSecondary,
        marginBottom: '0.75rem', // Adjusted to rem
    };

    const featureListStyle: React.CSSProperties = {
        listStyleType: 'none',
        paddingLeft: '0',
        margin: '0',
    };

    const featureItemStyle: React.CSSProperties = {
        display: 'flex' as React.CSSProperties['display'],
        alignItems: 'center' as React.CSSProperties['alignItems'],
        fontSize: 'var(--font-size-sm)', // Responsive
        color: AppColors.textLight,
        marginBottom: isMobile ? '0.375rem' : '0.625rem', // Adjusted for mobile
        lineHeight: 1.6, // Adjusted
    };

    const featureIconStyle: React.CSSProperties = {
        color: AppColors.primary,
        marginRight: isMobile ? '0.375rem' : '0.625rem', // Adjusted for mobile
        fontWeight: 700,
        fontSize: 'var(--font-size-base)', // Responsive
    };

    return (
        <div style={{...cardBaseStyle, ...animatedStyle}}>
            <div> 
                <h3 style={planNameStyle}>{planName}</h3>
                <p style={planDescriptionStyle}>{planDescription}</p>
            </div>
            
            <div> 
                <div style={featuresSectionStyle}>
                    <p style={featuresLabelStyle}>{featuresLabel}</p>
                    <ul style={featureListStyle}>
                        {features.map((feature, index) => (
                            <li key={index} style={featureItemStyle}>
                                <span style={featureIconStyle}>+</span> {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const HowItWorksSection = () => {
    const howItWorksCardsData = useMemo(() => [
        {
            planName: "Interest-Based Returns",
            planDescription: "For risk-averse investors who want fixed, predictable income streams from their investments.",
            keyBenefit: "Steady Payouts", 
            keyBenefitSubtitle: "Predictable Growth", 
            ctaText: "Explore Interest Options", 
            featuresLabel: "This option typically offers:",
            features: [
                "Fixed, predictable income",
                "Lower perceived risk profile",
                "Ideal for stable growth seekers",
                "Regular interest payments",
            ],
        },
        {
            planName: "Royalty-Based Returns",
            planDescription: "For those who want a share of revenue from successful businesses — without owning equity.",
            keyBenefit: "Revenue Share",
            keyBenefitSubtitle: "Growth-Tied Earnings",
            ctaText: "Discover Royalty Deals",
            featuresLabel: "This option typically offers:",
            features: [
                "Returns linked to business revenue",
                "Potential for high upside",
                "No equity dilution for businesses",
                "Alignment with sales performance",
            ],
        },
        {
            planName: "Equity-Based Returns",
            planDescription: "For long-term believers who wish to own a part of the companies and grow with their success.",
            keyBenefit: "Ownership Stake",
            keyBenefitSubtitle: "Long-Term Value",
            ctaText: "Find Equity Investments",
            featuresLabel: "This option typically offers:",
            features: [
                "Direct stake in company's future",
                "Voting rights in some cases",
                "Higher risk, higher reward potential",
                "Major growth potential"
            ],
        },
    ], []);

    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const [visibleCards, setVisibleCards] = useState(Array(howItWorksCardsData.length).fill(false));
     const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const currentCardsContainerRef = cardsContainerRef.current;
        const cardElements = currentCardsContainerRef ? Array.from(currentCardsContainerRef.children) : [];
        const observers: IntersectionObserver[] = [];

        cardElements.forEach((cardNode, index) => {
            if (cardNode instanceof HTMLElement) { 
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setVisibleCards(prev => {
                                const newVisible = [...prev];
                                newVisible[index] = true;
                                return newVisible;
                            });
                            observer.unobserve(entry.target);
                        }
                    },
                    { threshold: 0.1, rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px" }
                );
                observer.observe(cardNode);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [howItWorksCardsData.length, isMobile]); 

    const cardsContainerStyle: React.CSSProperties = {
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: isMobile ? 'column' as React.CSSProperties['flexDirection'] : 'row' as React.CSSProperties['flexDirection'],
        gap: '1.875rem', // Adjusted to rem
        alignItems: 'stretch' as React.CSSProperties['alignItems'], 
        width: isMobile ? '100%' : 'auto', 
    };
    

    return (
        <section style={{...commonStyles.section, backgroundColor: AppColors.subtleBg}} id="how-it-works" aria-labelledby="how-it-works-title">
            <div style={commonStyles.container}>
                <h2 id="how-it-works-title" style={commonStyles.sectionTitle}>How GetFund Bridges the Gap</h2>
                <p style={commonStyles.sectionSubtitle}>Offering flexible return options for investors and accessible capital for businesses.</p>
                
                <div ref={cardsContainerRef} style={cardsContainerStyle}>
                    {howItWorksCardsData.map((card, index) => (
                        <HowItWorksCard
                            key={card.planName}
                            planName={card.planName}
                            planDescription={card.planDescription}
                            featuresLabel={card.featuresLabel}
                            features={card.features}
                            isVisible={visibleCards[index]}
                            animationDelay={`${index * 0.1}s`}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
                <p style={{
                    ...commonStyles.sectionSubtitle, // Uses responsive font size from commonStyles
                    marginTop: '3.125rem', // Adjusted to rem
                    fontSize: 'var(--font-size-md)', // Explicitly use md for this specific tagline
                    fontWeight: 600, 
                    color: AppColors.primary,
                    textAlign: 'center' as React.CSSProperties['textAlign'], 
                }}>
                    A single platform that democratizes startup funding while offering flexible returns.
                </p>
            </div>
        </section>
    );
};

const Footer = () => {
    const footerStyle: React.CSSProperties = {
        backgroundColor: AppColors.primary,
        color: AppColors.textOnPrimary,
        padding: '1.875rem 0', // Adjusted padding
        textAlign: 'center' as React.CSSProperties['textAlign'],
    };

    const copyrightTextStyle: React.CSSProperties = {
        fontSize: 'var(--font-size-xs)', // Responsive
        opacity: 0.7,
        margin: 0, // Remove default margin from p tag
    };

    return (
        <footer style={footerStyle} role="contentinfo">
            <div style={commonStyles.container}>
                <p style={copyrightTextStyle}>
                    &copy; 2025 GetFund. All rights reserved.
                </p>
            </div>
        </footer>
    );
};


const App = () => {
    return (
        <>
            <Header />
            <main id="main-content" role="main">
                <HeroSection />
                <HighlightSection />
                <KeyBenefitsSection />
                <HowItWorksSection />
            </main>
            <Footer />
        </>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element.");
}

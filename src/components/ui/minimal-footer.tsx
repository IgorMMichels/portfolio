import {
	Grid2X2,
	MailsIcon,
	Globe2Icon,
	UserCircleIcon,
	ContactRoundIcon,
	SendIcon,
} from 'lucide-react';

export function MinimalFooter() {
	const year = new Date().getFullYear();

	const company = [
		{ title: 'About Us', href: '#' },
		{ title: 'Careers', href: '#' },
		{ title: 'Brand assets', href: '#' },
		{ title: 'Privacy Policy', href: '#' },
		{ title: 'Terms of Service', href: '#' },
	];

	const resources = [
		{ title: 'Blog', href: '#' },
		{ title: 'Help Center', href: '#' },
		{ title: 'Contact Support', href: '#' },
		{ title: 'Community', href: '#' },
		{ title: 'Security', href: '#' },
	];

	const socialLinks = [
		{ icon: <MailsIcon size={16} />, link: '#' },
		{ icon: <Globe2Icon size={16} />, link: '#' },
		{ icon: <UserCircleIcon size={16} />, link: '#' },
		{ icon: <ContactRoundIcon size={16} />, link: '#' },
		{ icon: <SendIcon size={16} />, link: '#' },
		{ icon: <Grid2X2 size={16} />, link: '#' },
	];

	const styles = {
		container: {
			background: 'radial-gradient(35% 80% at 30% 0%, hsl(var(--foreground) / 0.1))',
			maxWidth: '56rem',
			margin: '0 auto',
			borderLeft: '1px solid hsl(var(--border))',
			borderRight: '1px solid hsl(var(--border))',
		},
		divider: {
			background: 'hsl(var(--border))',
			height: '1px',
			width: '100%',
			position: 'absolute' as const,
			left: 0,
			right: 0,
		},
		grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
			gap: '1.5rem',
			padding: '1rem',
			maxWidth: '56rem',
		},
		logoSection: {
			gridColumn: 'span 6 / span 6',
			display: 'flex',
			flexDirection: 'column' as const,
			gap: '1.25rem',
		},
		logo: {
			width: 'max-content',
			opacity: 0.25,
		},
		description: {
			color: 'hsl(var(--muted-foreground))',
			fontFamily: 'monospace',
			fontSize: '0.875rem',
			maxWidth: '24rem',
			textWrap: 'balance' as const,
		},
		socialLinks: {
			display: 'flex',
			gap: '0.5rem',
		},
		socialLink: {
			border: '1px solid hsl(var(--border))',
			borderRadius: '0.375rem',
			padding: '0.375rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		linkColumn: {
			gridColumn: 'span 3 / span 3',
			width: '100%',
		},
		linkColumnTitle: {
			color: 'hsl(var(--muted-foreground))',
			fontSize: '0.75rem',
			marginBottom: '0.25rem',
		},
		linkColumnLinks: {
			display: 'flex',
			flexDirection: 'column' as const,
			gap: '0.25rem',
		},
		link: {
			width: 'max-content',
			padding: '0.25rem 0',
			fontSize: '0.875rem',
			transition: 'all 0.2s',
		},
		bottomSection: {
			display: 'flex',
			flexDirection: 'column' as const,
			justifyContent: 'space-between',
			gap: '0.5rem',
			paddingTop: '0.5rem',
			paddingBottom: '1.25rem',
			maxWidth: '56rem',
		},
		copyright: {
			color: 'hsl(var(--muted-foreground))',
			textAlign: 'center' as const,
			fontWeight: 300,
		},
	};

	return (
		<footer style={{ position: 'relative' }}>
			<div style={styles.container}>
				<div style={styles.divider} />
				<div style={styles.grid}>
					<div className="md:col-span-4" style={styles.logoSection}>
						<a href="#" style={styles.logo}>
							<Grid2X2 size={32} />
						</a>
						<p style={styles.description}>
							A comprehensive financial technology platform.
						</p>
						<div style={styles.socialLinks}>
							{socialLinks.map((item, i) => (
								<a
									key={i}
									style={styles.socialLink}
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div style={styles.linkColumn}>
						<span style={styles.linkColumnTitle}>Resources</span>
						<div style={styles.linkColumnLinks}>
							{resources.map(({ href, title }, i) => (
								<a key={i} style={styles.link} href={href}>
									{title}
								</a>
							))}
						</div>
					</div>
					<div style={styles.linkColumn}>
						<span style={styles.linkColumnTitle}>Company</span>
						<div style={styles.linkColumnLinks}>
							{company.map(({ href, title }, i) => (
								<a key={i} style={styles.link} href={href}>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div style={styles.divider} />
				<div style={styles.bottomSection}>
					<p style={styles.copyright}>
						© sshahaider. All rights reserved {year}
					</p>
				</div>
			</div>
		</footer>
	);
}

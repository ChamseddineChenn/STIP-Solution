import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaIndustry,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import PolicyModal from './PolicyModal';

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blogs' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      {
        label: 'Fabrication sur mesure',
        href: '/services/custom-manufacturing',
      },
      {
        label: 'Scan et ingénierie',
        href: '/services/engineering-3d-scanning',
      },
      { label: 'Soudage & assemblage', href: '/services/welding-assembly' },
      {
        label: 'Maintenance industrielle',
        href: '/services/industrial-maintenance',
      },
    ],
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://ca.linkedin.com/company/stip-solution',
    },
    {
      icon: <FaFacebook />,
      label: 'Facebook',
      href: 'https://www.facebook.com/stip.solution/?locale=fr_FR',
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      href: 'https://www.instagram.com/p/DSsT7auCtQj/',
    },
  ];

  return (
    <footer className="section-dark pt-20 pb-10 relative overflow-hidden min-h-screen">
      {/* Industrial pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49%, rgba(59, 130, 246, 0.05) 50%, transparent 51%)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pb-16">
          {/* Column 1: Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-4">
              {/* Logo Container */}
              <div className="rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden h-fit">
                <img
                  className="h-20 w-auto object-contain"
                  src={assets.blue_stip_logo}
                  alt="STIP Solution Logo"
                />
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Solutions industrielles de précision et de main-d'œuvre. Des
              résultats mesurables grâce à l'excellence en ingénierie et à une
              expertise technique certifiée.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-card-bg text-text-light hover:bg-primary hover:text-text-light transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  aria-label={`Suivez-nous sur ${social.label}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 pt-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-1 bg-primary-50 mr-3"></div>
              <h3 className="text-text-light text-lg font-bold uppercase tracking-wider">
                Navigation
              </h3>
            </div>

            <ul className="space-y-3">
              {footerLinks.navigation.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary/0 group-hover:bg-primary mr-3 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 pt-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-1 bg-primary-50 mr-3"></div>
              <h3 className="text-text-light text-lg font-bold uppercase tracking-wider">
                Services
              </h3>
            </div>

            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <motion.li
                  key={service.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={service.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary/0 group-hover:bg-primary mr-3 transition-all duration-300"></span>
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 pt-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-1 bg-primary-50 mr-3"></div>
              <h3 className="text-text-light text-lg font-bold uppercase tracking-wider">
                Contact
              </h3>
            </div>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaPhone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Téléphone
                  </div>
                  <div className="text-text-secondary text-sm">
                    <a
                      href="https://wa.me/14189904459"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      +1 (418) 990-4459
                    </a>
                    <br />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Courriel
                  </div>
                  <div className="text-text-secondary text-sm">
                    <a
                      href="mailto:contact@stip.ca"
                      className="hover:text-primary transition-colors"
                    >
                      contact@stip.ca
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Horaires
                  </div>
                  <div className="text-text-secondary text-sm">
                    Lun–Sam: 7H00 - 17H00
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 5: Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 pt-8"
          >
            <div className="flex items-center">
              <div className="w-8 h-1 bg-primary-50 mr-3"></div>
              <h3 className="text-text-light text-lg font-bold uppercase tracking-wider">
                Emplacements
              </h3>
            </div>

            <div className="space-y-5">
              {/* Siege Social */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Siège social
                  </div>
                  <div className="text-text-secondary text-sm">
                    2828 Boul Laurier
                    <br />
                    Québec, QC G1V 0B9
                  </div>
                </div>
              </div>

              {/* Centre Operationnel */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Usine
                  </div>
                  <div className="text-text-secondary text-sm">
                    500 Rue St. George
                    <br />
                    Moncton, NB E1C 1Y3
                  </div>
                </div>
              </div>

              {/* Manufacturing Space */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-50 text-text-light">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-text-light text-sm font-semibold mb-1">
                    Espace manufacturier
                  </div>
                  <div className="text-text-secondary text-sm">
                    23 Rte Delage
                    <br />
                    Cap-Santé, QC G0A 1L0
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-primary/20 mb-10"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
        >
          {/* Copyright */}
          <div className="text-center md:text-left">
            <div className="text-text-secondary text-sm">
              © {currentYear} STIP Solution. Tous droits réservés.
            </div>
            <div className="text-text-light text-xs mt-1">
              Solutions d'ingénierie de précision et de main-d'œuvre
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'Politique de confidentialité',
              "Conditions d'utilisation",
              'Normes de sécurité',
              'Certifications de qualité',
            ].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => setOpenModal(item)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-text-secondary hover:text-primary text-sm transition-colors duration-300 cursor-pointer bg-none border-none"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Certifications */}
        </motion.div>

        {/* Emergency Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 text-center"
        >
          <a
            href="https://wa.me/14185582557"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-6 py-3 bg-primary-50/10 backdrop-blur-sm hover:bg-primary-50/20 transition-colors"
          >
            <FaPhone className="w-5 h-5 text-primary-50 animate-pulse" />
            <div className="text-text-light text-sm font-bold">
              Assistance industrielle :{' '}
              <span className="text-primary-50">+1 (418) 990-4459</span>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Policy Modals */}
      <PolicyModal
        isOpen={openModal === 'Politique de confidentialité'}
        onClose={() => setOpenModal(null)}
        title="Politique de confidentialité"
      >
        <h3 className="text-xl font-bold text-text-light mb-4">
          1. Informations collectées
        </h3>
        <p>
          STIP Solutions s'engage à protéger vos informations personnelles en
          conformité avec la législation canadienne sur la confidentialité, y
          compris la Loi sur la protection des renseignements personnels et les
          documents électroniques (PIPEDA) et les lois provinciales, telles que
          la Loi 25 du Québec. Nous collectons des informations personnelles
          telles que les noms, coordonnées, informations sur l'entreprise,
          spécifications de projet, emplacement des sites, calendriers de
          projet, certifications de sécurité, informations d'assurance et
          historiques de communication lorsque vous demandez nos services,
          soumettez des devis ou collaborez avec nos solutions de main-d'œuvre.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          2. Finalités de la collecte
        </h3>
        <p>
          Nous collectons des informations personnelles uniquement à des fins
          commerciales légitimes : fournir des services de fabrication
          industrielle, traiter les demandes de services et de devis, planifier
          le déploiement de main-d'œuvre, réaliser des évaluations de sécurité
          et des vérifications de conformité, coordonner les calendriers de
          projet, communiquer les mises à jour, traiter la facturation et les
          paiements, conserver les dossiers de qualité et de sécurité et
          respecter la législation canadienne applicable.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          3. Sécurité et stockage des données
        </h3>
        <p>
          Nous appliquons des mesures de sécurité robustes pour protéger les
          informations personnelles contre l'accès non autorisé, l'altération ou
          la divulgation. Les données sont chiffrées en transit selon des
          protocoles TLS standard. Les informations personnelles sont stockées
          sur des serveurs canadiens et l'accès est réservé au personnel
          autorisé. Les dossiers sont conservés uniquement aussi longtemps que
          nécessaire pour l'exécution des services et les obligations légales.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          4. Partage et divulgation
        </h3>
        <p>
          STIP Solutions ne vend pas, n'échange pas et ne loue pas les
          informations personnelles à des tiers. Nous pouvons divulguer des
          informations à des fournisseurs de confiance (comptables, conseillers
          juridiques, assureurs) uniquement lorsque cela est nécessaire pour la
          prestation de services et sous accords de confidentialité stricts.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          5. Vos droits
        </h3>
        <p>
          Conformément à la PIPEDA et aux lois provinciales, vous avez le droit
          d'accéder à vos informations, de demander des corrections, de demander
          la suppression lorsque la loi le permet, de retirer votre consentement
          et d'obtenir des informations sur nos pratiques de confidentialité.
          Pour exercer ces droits, contactez notre responsable de la
          confidentialité à privacy@stipsolution.ca.
        </p>
      </PolicyModal>

      <PolicyModal
        isOpen={openModal === "Conditions d'utilisation"}
        onClose={() => setOpenModal(null)}
        title="Conditions d'utilisation"
      >
        <h3 className="text-xl font-bold text-text-light mb-4">
          1. Champ d'application des services et accord
        </h3>
        <p>
          STIP Solutions fournit des services de fabrication industrielle,
          soudage de précision, fabrication métallique, services d'ingénierie,
          maintenance d'équipements, nettoyage industriel, revêtements et
          finitions, soudage mobile et déploiement de main-d'œuvre qualifiée à
          travers le Canada. En sollicitant nos services, vous acceptez ces
          conditions. Elles sont régies par les lois du Canada et de la province
          applicable où les services sont fournis.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          2. Devis et tarification
        </h3>
        <p>
          Tous les tarifs sont basés sur des devis détaillés fournis après
          évaluation du site ou examen des spécifications du projet. Les devis
          sont valables 30 jours, sauf indication contraire. Les prix finaux
          peuvent être ajustés si l'étendue du projet, les matériaux, le
          calendrier ou les conditions du site changent de manière
          significative.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          3. Modalités de paiement
        </h3>
        <p>
          Les conditions de paiement standard sont Net 30 jours à compter de la
          date de facturation. Nous acceptons les virements bancaires, chèques
          d'entreprise ou cartes de crédit (frais applicables). Pour les projets
          dépassant 50 000 $ CAD, un acompte de 30 % est requis à l'acceptation
          du devis.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          4. Assurance et responsabilité
        </h3>
        <p>
          Nous maintenons une couverture d'assurance appropriée, qui sera
          précisée dans le contrat de service. Vous acceptez de maintenir une
          assurance adéquate pour vos opérations et d'inscrire STIP Solutions
          comme assuré additionnel lorsque cela est applicable. Notre
          responsabilité est limitée au montant total payé pour le service
          concerné; nous ne sommes pas responsables des dommages indirects,
          consécutifs ou punitifs.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          5. Garantie et normes de service
        </h3>
        <p>
          Tous les travaux réalisés par STIP Solutions respectent ou dépassent
          les normes industrielles canadiennes applicables, y compris celles de
          la Canadian Standards Association (CSA), du Welding Institute of
          Canada et des normes ISO pertinentes. Nous garantissons que les
          travaux seront exécutés de manière professionnelle et conformes aux
          spécifications. Les périodes de garantie varient selon le type de
          service : la fabrication et les travaux de soudage bénéficient d'une
          garantie d'intégrité structurelle de deux ans; les services
          d'ingénierie sont garantis pendant cinq ans. La garantie ne couvre pas
          les dommages résultant d'une mauvaise utilisation, d'un accident, d'un
          entretien inadéquat ou de modifications non autorisées.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          6. Propriété intellectuelle et titularité des travaux
        </h3>
        <p>
          Tous les dessins, spécifications et méthodes développés par STIP
          Solutions restent notre propriété exclusive, sauf accord écrit
          contraire. Les clients conservent la propriété des composants
          fabriqués et des biens manufacturés. Pour les projets d'ingénierie,
          les clients reçoivent la propriété des documents finaux, tandis que
          STIP Solutions conserve les droits sur les processus et méthodologies
          sous-jacents. Les clients ne peuvent reproduire, distribuer ou
          modifier notre propriété intellectuelle sans autorisation écrite
          explicite.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          7. Force majeure et circonstances imprévues
        </h3>
        <p>
          Aucune des parties n'est tenue responsable du manquement à ses
          obligations en raison de circonstances hors de son contrôle
          raisonnable, y compris catastrophes naturelles, pandémies, actions
          gouvernementales, intempéries, grèves ou défaillances de services
          publics. Dans de tels cas, nous proposerons des solutions alternatives
          lorsque possible ou reprogrammerons les services sans pénalité dès le
          retour à la normale.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          8. Résiliation des services
        </h3>
        <p>
          Chaque partie peut résilier les services avec un préavis écrit de 14
          jours. En cas de résiliation, les clients restent redevables des
          services rendus et des matériaux achetés. Pour le déploiement de
          main-d'œuvre, la résiliation nécessite un préavis de 48 heures. Les
          factures impayées deviennent immédiatement exigibles et nous nous
          réservons le droit de suspendre les services en cas de non-paiement ou
          de compromission des normes de sécurité.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          9. Règlement des litiges
        </h3>
        <p>
          Les litiges sont régis par le droit canadien et seront d'abord traités
          par des négociations de bonne foi entre les parties. Si le différend
          n'est pas résolu dans les 30 jours, il sera soumis à l'arbitrage
          contraignant conformément aux règles applicables, sauf disposition
          contraire exigée par la loi. La partie gagnante peut récupérer les
          frais juridiques et d'arbitrage raisonnables.
        </p>
      </PolicyModal>

      <PolicyModal
        isOpen={openModal === 'Normes de sécurité'}
        onClose={() => setOpenModal(null)}
        title="Normes de sécurité"
      >
        <h3 className="text-xl font-bold text-text-light mb-4">
          1. Cadre de conformité réglementaire
        </h3>
        <p>
          STIP Solutions respecte strictement toutes les réglementations
          fédérales et provinciales applicables en matière de santé et de
          sécurité au travail. Nos opérations sont conformes au Code canadien du
          travail (Partie II) et aux législations provinciales (par exemple la
          Loi sur la santé et la sécurité au travail de l'Ontario, la Workers
          Compensation Act de la Colombie-Britannique et la Loi sur la santé et
          la sécurité du travail du Québec). Nous maintenons des enregistrements
          et des certifications auprès des organismes provinciaux compétents.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          2. Conformité provinciale et enregistrements
        </h3>
        <p>
          STIP Solutions est enregistrée et en règle auprès des autorités
          provinciales compétentes. Nous réalisons des audits internes de
          sécurité réguliers et répondons aux exigences d'inspection locale.
          Notre taux de blessures est suivi en continu et nous appliquons des
          actions correctives dès l'identification de risques.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          3. Équipements de protection individuelle (EPI) et normes
        </h3>
        <p>
          Tout le personnel utilise des EPI certifiés par la Canadian Standards
          Association (CSA) adaptés à la tâche : casques certifiés, lunettes de
          sécurité, bottes à embout d'acier et vêtements haute visibilité. Les
          EPI spécifiques (protection auditive, respiratoire, gants résistants
          aux coupures, vêtements ignifuges) sont contrôlés, entretenus et
          remplacés selon les recommandations du fabricant.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          4. Protocoles pour travaux à chaud et espaces confinés
        </h3>
        <p>
          Les travaux à chaud (soudage, découpe, meulage) respectent le Code
          national du feu et exigent un permis de travail à chaud, une veille
          incendie continue et des procédures d'atténuation. L'entrée en espace
          confiné suit la norme CSA correspondante, avec essais atmosphériques,
          équipement de secours et autorisations requises.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          5. Formation, certification et compétences
        </h3>
        <p>
          Tout le personnel reçoit une initiation à la sécurité et des
          formations annuelles. Les soudeurs conservent leurs certifications
          (WIC) et les superviseurs détiennent des certifications en santé et
          sécurité. Les dossiers de formation et de compétence sont archivés et
          disponibles pour inspection.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          6. Évaluation des risques et gestion
        </h3>
        <p>
          Avant tout projet, nous réalisons une évaluation complète des risques
          (ergonomie, produits chimiques, bruit, température, risques
          mécaniques) et développons un plan de sécurité adapté au site. Les
          réunions quotidiennes (toolbox talks) identifient les risques
          émergents et reforcent les procédures sûres.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          7. Signalement des incidents et enquêtes
        </h3>
        <p>
          Tous incidents, blessures et quasi-accidents sont signalés et
          documentés. Les incidents graves sont déclarés aux organismes
          provinciaux et font l'objet d'une enquête formelle visant à en
          prévenir la récurrence.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          8. Amélioration continue
        </h3>
        <p>
          Nous maintenons une culture proactive de sécurité via des audits
          réguliers, le suivi d'indicateurs (quasi-accidents, observations,
          formation) et des comités de sécurité impliquant les employés.
        </p>
      </PolicyModal>

      <PolicyModal
        isOpen={openModal === 'Certifications de qualité'}
        onClose={() => setOpenModal(null)}
        title="Certifications de qualité"
      >
        <h3 className="text-xl font-bold text-text-light mb-4">
          1. ISO 9001:2015 — Système de management de la qualité
        </h3>
        <p>
          STIP Solutions détient une certification ISO 9001:2015 délivrée par un
          organisme accrédité. Notre système de management de la qualité
          garantit une prestation cohérente et maîtrisée des processus de
          planification, conception, approvisionnement, production, contrôle et
          livraison. Les résultats d'audit et les actions correctives sont
          documentés et suivis.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          2. Welding Institute of Canada (WIC) et certifications en soudage
        </h3>
        <p>
          Toutes les opérations de soudage sont pratiquées par des soudeurs
          certifiés WIC et supervisées conformément aux exigences applicables
          (SMAW, MIG, TIG, etc.). Les qualifications en soudage et leurs
          enregistrements sont disponibles pour inspection; les contrôles non
          destructifs (radiographie, ultrasons) sont effectués lorsque requis.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          3. Conformité aux normes CSA
        </h3>
        <p>
          Nos procédés et produits respectent les normes de la Canadian
          Standards Association (CSA) applicables au domaine d'intervention
          (structures, équipements sous pression, levage et manutention, etc.).
          La documentation de conformité est fournie aux clients sur demande.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          4. Contrôles qualité et essais certifiés
        </h3>
        <p>
          Nous appliquons un contrôle qualité multi-étapes, de la réception des
          matières premières aux vérifications finales. Les inspections en cours
          de production et les essais NDT garantissent la conformité aux
          spécifications. Les équipements de mesure sont étalonnés
          régulièrement.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          5. Traçabilité des matériaux
        </h3>
        <p>
          Tous les matériaux utilisés conservent une traçabilité complète depuis
          le fournisseur jusqu'au produit final. Les certificats matière
          accompagnent les livraisons et les numéros de lot sont consignés pour
          les applications critiques.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          6. Normes de conception et d'ingénierie
        </h3>
        <p>
          Les travaux d'ingénierie respectent les normes nationales et
          internationales (CSA, ISO, ASME) et sont réalisés par des ingénieurs
          qualifiés. Les projets complexes font l'objet d'une revue par les
          pairs et des scellés professionnels lorsque requis.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          7. Étalonnage et équipements de mesure
        </h3>
        <p>
          Les équipements de mesure sont étalonnés annuellement par des
          laboratoires accrédités. Les certificats d'étalonnage sont archivés et
          toute non-conformité déclenche une revue des pièces contrôlées durant
          la période concernée.
        </p>

        <h3 className="text-xl font-bold text-text-light mb-4 mt-6">
          8. Amélioration continue et maintien des certifications
        </h3>
        <p>
          La qualité chez STIP Solutions est un processus d'amélioration
          continue : revues de gestion mensuelles, audits tiers annuels et
          formation continue du personnel pour maintenir et améliorer nos
          certifications et processus.
        </p>
      </PolicyModal>
    </footer>
  );
};

export default Footer;

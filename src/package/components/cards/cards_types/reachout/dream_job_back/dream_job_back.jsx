import React, { memo } from 'react';

// import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';

// import { List, ListItem, PopperCard, Typography } from '@welovedevs/ui';

import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
// import { ContractType } from '../../../../commons/fields/contract_types/contract_types';
import { DreamJobCurrentJobIssues } from './dream_job_current_job_issues/dream_job_current_job_issues';
import { DreamJobPerks } from './dream_job_perks/dream_job_perks';
import { DreamJobSalarySectionContent } from './dream_job_salary_section_content/dream_job_salary_section_content';

// import { useOpenerState } from '../../../../hooks/use_opener_state';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';

// import { REMOTE_FREQUENCY } from '../../../../../utils/enums/remote/remote_utils';
// import { remoteDisplayTranslations } from '../../../../../utils/enums/remote/remote_filter_translations';

// import { styles } from './dream_job_back_styles';
import { hasOnlyFreelanceContract } from '../../../utils/has_only_freelance_contract';

// const useStyles = createUseStyles(styles);

const DreamJobBackComponent = ({ data }) => {
    // const classes = useStyles();
    const { averageDailyRate, places, perks, salary, contractTypes, currentJobIssues } = data;
    const isFreelance = hasOnlyFreelanceContract(contractTypes) ? salary : averageDailyRate;

    return (
        <ProfileCardAnimatedBack title={<FormattedMessage id="Reachout.Back.Title" defaultMessage="Dream job" />}>
            {existsAndNotEmpty(places) && (
                <ProfileCardSection>
 {'Hit me up on either of these channels'}

                    {/* <DreamJobLocations places={places} remoteFrequency={remoteFrequency} classes={classes} /> */}
                </ProfileCardSection>
            )}
            {existsAndNotEmpty(isFreelance ? averageDailyRate : salary) &&
                (isFreelance ? averageDailyRate !== '0' : salary !== '0') && (
                    <ProfileCardSection>
                        <DreamJobSalarySectionContent
                            contractTypes={contractTypes}
                            averageDailyRate={averageDailyRate}
                            salary={salary}
                        />
                    </ProfileCardSection>
                )}
                       {existsAndNotEmpty(contractTypes) && (
                <ProfileCardSection>
                    <ProfileCardSectionTitle>
                        <FormattedMessage id="Reachout.Back.Email" defaultMessage="Contract types" />
                    </ProfileCardSectionTitle>
                    <ProfileCardSectionText>
                        {'sheidynjiiri@gmail.com'}
                        {/* <ContractType contractTypes={contractTypes} /> */}
                    </ProfileCardSectionText>
                </ProfileCardSection>
            )}
            {existsAndNotEmpty(contractTypes) && (
                <ProfileCardSection>
                    <ProfileCardSectionTitle>
                        <FormattedMessage id="Reachout.Back.whatsapp" defaultMessage="Contract types" />
                    </ProfileCardSectionTitle>
                    <ProfileCardSectionText>
                        {'+254 790361555'}
                        {/* <ContractType contractTypes={contractTypes} /> */}
                    </ProfileCardSectionText>
                </ProfileCardSection>
            )}
            {existsAndNotEmpty(perks) &&
                typeof perks === 'object' &&
                Object.values(perks).some((value) => existsAndNotEmpty(value)) && (
                    <ProfileCardSection>
                        <ProfileCardSectionTitle>
                            <FormattedMessage
                                id="Dreamjob.Back.Location.Perks.Title"
                                defaultMessage="Important perks in my job"
                            />
                        </ProfileCardSectionTitle>
                        <ProfileCardSectionText>
                            <DreamJobPerks perks={perks} />
                        </ProfileCardSectionText>
                    </ProfileCardSection>
                )}
            {existsAndNotEmpty(currentJobIssues) && (
                <ProfileCardSection>
                    <ProfileCardSectionTitle>
                        <FormattedMessage
                            id="Dreamjob.Back.Location.CurrentJobIssues.Title"
                            defaultMessage="Current job's issues"
                        />
                    </ProfileCardSectionTitle>
                    <ProfileCardSectionText component="div">
                        <DreamJobCurrentJobIssues currentJobIssues={currentJobIssues} />
                    </ProfileCardSectionText>
                </ProfileCardSection>
            )}
        </ProfileCardAnimatedBack>
    );
};

// const DreamJobLocations = ({ remoteFrequency, places, classes }) => {
//     const { formatMessage } = useIntl();
//     if (remoteFrequency === REMOTE_FREQUENCY.FULL_TIME) {
//         return <FormattedMessage id="Dreamjob.Back.Location.RemoteOnly" defaultMessage="I want to work remotely" />;
//     }

//     return (
//         <>
//             <ProfileCardSectionTitle>
//                 <FormattedMessage id="Dreamjob.Back.Location.Title" defaultMessage="My dreamjob location" />
//             </ProfileCardSectionTitle>
//             <ProfileCardSectionText>
//                 <DreamJobPlaces places={places} classes={classes} />
//                 <br />
//                 {remoteFrequency &&
//                     formatMessage(remoteDisplayTranslations[remoteFrequency] || remoteDisplayTranslations.others)}
//             </ProfileCardSectionText>
//         </>
//     );
// };

// const DreamJobPlaces = ({ places = [], classes }) => {
//     const textAnchor = useRef();
//     const [open, handlers] = useOpenerState();
//     const { firstPlace, remainingPlaces } = useMemo(() => {
//         const placesCopy = [...places];
//         const item = placesCopy.shift();
//         return { firstPlace: item, remainingPlaces: placesCopy };
//     }, [places]);

//     if (!remainingPlaces.length) {
//         return (
//             <ProfileCardSectionText>
//                 <FormattedMessage
//                     id="Dreamjob.Back.Location.OnePlace"
//                     defaultMessage="I want to work in {place}"
//                     values={{ place: firstPlace?.name ?? '' }}
//                 />
//             </ProfileCardSectionText>
//         );
//     }

//     return (
//         // {'Card content - Hit me up on either of these Email me - sheidynjiiri@gmail.com Whatsapp - +254 786770842'}
//         <>
//             <button className={classes.button} type="button" ref={textAnchor} {...handlers}>
//                 <FormattedMessage
//                     id="Reachout.Back.Location.ManyPlaces"
//                     defaultMessage="Hit me up on either of these Email me - sheidynjiiri@gmail.com Whatsapp - +254 786770842"
//                 />
//             </button>
//             <PopperCard
//                 open={open}
//                 anchorElement={textAnchor.current}
//                 popperProps={{
//                     modifiers: {
//                         preventOverflow: {
//                             boundariesElement: 'viewport'
//                         }
//                     }
//                 }}
//             >
//                 <List>
//                     {remainingPlaces
//                         .filter((item) => item)
//                         .map(({ name }, index) => (
//                             <ListItem key={`place_popper_${index}`}>
//                                 <Typography>{name}</Typography>
//                             </ListItem>
//                         ))}
//                 </List>
//             </PopperCard>
//         </>
//     );
// };

export const DreamJobBack = memo(DreamJobBackComponent);

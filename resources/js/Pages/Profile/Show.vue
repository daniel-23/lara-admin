<template>
    <app-layout>
        <template #header>
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">{{ __('Profile') }}</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <inertia-link :href="route('dashboard')">{{ __('Dashboard') }}</inertia-link>
                                </li>
                                <li class="breadcrumb-item active">{{__('Profile')}}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12" v-if="$page.props.jetstream.canUpdateProfileInformation">
                        <update-profile-information-form :user="$page.props.user" />

                        <jet-section-border />
                    </div>

                    <div class="col-12" v-if="$page.props.jetstream.canUpdatePassword">
                        <update-password-form />
                        <jet-section-border />
                    </div>

                    <div class="col-12" v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
                        <two-factor-authentication-form />

                        <jet-section-border />
                    </div>

                    <div class="col-12">
                        <logout-other-browser-sessions-form :sessions="sessions" />

                        <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
                            <jet-section-border />

                            <delete-user-form class="mt-10 sm:mt-0" />
                        </template>
                    </div>
                </div>
            </div>
            
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout'
    import DeleteUserForm from './DeleteUserForm'
    import JetSectionBorder from '@/Jetstream/SectionBorder'
    import LogoutOtherBrowserSessionsForm from './LogoutOtherBrowserSessionsForm'
    import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm'
    import UpdatePasswordForm from './UpdatePasswordForm'
    import UpdateProfileInformationForm from './UpdateProfileInformationForm'

    export default {
        props: ['sessions'],

        components: {
            AppLayout,
            DeleteUserForm,
            JetSectionBorder,
            LogoutOtherBrowserSessionsForm,
            TwoFactorAuthenticationForm,
            UpdatePasswordForm,
            UpdateProfileInformationForm,
        },
    }
</script>

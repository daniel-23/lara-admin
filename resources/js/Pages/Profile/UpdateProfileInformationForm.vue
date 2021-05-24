<template>
    <jet-form-section @submitted="updateProfileInformation">
        <template #title>
            {{ __('Profile Information') }}
        </template>

        <template #description>
            {{ __("Update your account's profile information and email address.") }}
        </template>

        <template #form>
            <div class="card-body">
                <!-- Profile Photo -->
                <div class="form-group" v-if="$page.props.jetstream.managesProfilePhotos">
                    <!-- Profile Photo File Input -->
                    <input type="file" class="d-none"
                           ref="photo"
                           @change="updatePhotoPreview">
                    <jet-label for="photo" :value="__('Photo')" />

                    <!-- Current Profile Photo -->
                    <div class="text-center" v-show="! photoPreview">
                        <img :src="user.profile_photo_url" :alt="user.name" class="img-circle img-thumbnail" style="width: 100px; height: 100px;">
                    </div>

                    <!-- New Profile Photo Preview -->
                    <div class="text-center" v-show="photoPreview">
                        <img :src="photoPreview" :alt="user.name" class="img-circle img-thumbnail" style="width: 100px; height: 100px;">
                    </div>

                    <div class="text-center">
                        <jet-secondary-button class="mt-2 mr-2" type="button" @click.prevent="selectNewPhoto">
                            {{ __('Select A New Photo') }}
                        </jet-secondary-button>
                        <jet-secondary-button type="button" class="mt-2" @click.prevent="deletePhoto" v-if="user.profile_photo_path">
                            {{ __('Remove Photo') }}
                        </jet-secondary-button>
                    </div>
                    <jet-input-error :message="form.errors.photo" class="mt-2" />
                </div>

                <!-- Name -->
                <div class="form-group">
                    <jet-label for="name" :value="__('Name')" />
                    <jet-input id="name" type="text" :class="{ 'is-invalid': form.errors.name }" v-model="form.name" autocomplete="name" />
                    <jet-input-error :message="form.errors.name" class="mt-2" />
                </div>
                <!-- Email -->
                <div class="form-group">
                    <jet-label for="email" :value="__('Email')" />
                    <jet-input id="email" type="email" :class="{ 'is-invalid': form.errors.email }" v-model="form.email" />
                    <jet-input-error :message="form.errors.email" class="mt-2" />
                </div>
            </div>
        </template>

        <template #actions>
            <div class="card-footer">
                <jet-action-message :on="form.recentlySuccessful">
                    {{ __('Saved.') }}
                </jet-action-message>

                <jet-button class="btn-primary float-right" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ __('Save') }}
                </jet-button>
            </div>
        </template>
    </jet-form-section>
</template>

<script>
    import JetButton from '@/Jetstream/Button'
    import JetFormSection from '@/Jetstream/FormSection'
    import JetInput from '@/Jetstream/Input'
    import JetInputError from '@/Jetstream/InputError'
    import JetLabel from '@/Jetstream/Label'
    import JetActionMessage from '@/Jetstream/ActionMessage'
    import JetSecondaryButton from '@/Jetstream/SecondaryButton'

    export default {
        components: {
            JetActionMessage,
            JetButton,
            JetFormSection,
            JetInput,
            JetInputError,
            JetLabel,
            JetSecondaryButton,
        },

        props: ['user'],

        data() {
            return {
                form: this.$inertia.form({
                    _method: 'PUT',
                    name: this.user.name,
                    email: this.user.email,
                    photo: null,
                }),

                photoPreview: null,
            }
        },

        methods: {
            updateProfileInformation() {
                if (this.$refs.photo) {
                    this.form.photo = this.$refs.photo.files[0]
                }

                this.form.post(route('user-profile-information.update'), {
                    errorBag: 'updateProfileInformation',
                    preserveScroll: true,
                    onSuccess: () => (this.clearPhotoFileInput()),
                });
            },

            selectNewPhoto() {
                this.$refs.photo.click();
            },

            updatePhotoPreview() {
                const photo = this.$refs.photo.files[0];

                if (! photo) return;

                const reader = new FileReader();

                reader.onload = (e) => {
                    this.photoPreview = e.target.result;
                };

                reader.readAsDataURL(photo);
            },

            deletePhoto() {
                this.$inertia.delete(route('current-user-photo.destroy'), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.photoPreview = null;
                        this.clearPhotoFileInput();
                    },
                });
            },

            clearPhotoFileInput() {
                if (this.$refs.photo?.value) {
                    this.$refs.photo.value = null;
                }
            },
        },
    }
</script>

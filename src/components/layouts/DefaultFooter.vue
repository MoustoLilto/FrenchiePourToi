<template>
    <footer class="bg-primary/10 py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">Frenchie Pour Toi</h3>
                    <p class="mb-4">
                        {{ $t('common.footer.description') }}
                    </p>
                    <SocialLinks />
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">
                        {{ $t('common.footer.quickLinks') }}
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <RouterLink to="/" class="hover:text-primary">
                                {{ $t('common.navigation.home') }}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PUPPIES }"
                                class="hover:text-primary"
                            >
                                {{ $t('common.navigation.puppies') }}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PARENTS }"
                                class="hover:text-primary"
                            >
                                {{ $t('common.navigation.parents') }}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.RESERVATION }"
                                class="hover:text-primary"
                            >
                                {{ $t('common.navigation.reservation') }}
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="hover:text-primary"
                            >
                                {{ $t('common.navigation.contact') }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">
                        {{ $t('common.footer.contact') }}
                    </h3>
                    <p class="mb-2">
                        <i class="icon-[carbon--location] mr-2" />
                        {{ $t('common.footer.address') }}
                    </p>
                    <p class="mb-2">
                        <i class="icon-[carbon--phone] mr-2" />
                        {{ $t('common.footer.phone') }}
                    </p>
                    <p class="mb-2">
                        <i class="icon-[carbon--email] mr-2" />
                        {{ $t('common.footer.email') }}
                    </p>
                </div>
            </div>
            <div class="border-base-300 mt-8 border-t pt-8 text-center">
                <p class="caption-text">
                    {{ $t('common.footer.copyright', { year: currentYear }) }}
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import SocialLinks from '@/components/SocialLinks.vue';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';

const { t } = useI18n();
const currentYear = computed(() => DateTime.now().year);
</script>
